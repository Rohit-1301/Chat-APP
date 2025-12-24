import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { sendOtpEmail } from "../lib/mailer.js";
import isDisposableEmail from "../lib/disposableEmails.js";
import { generateDeviceFingerprint, isDeviceTrusted, addTrustedDevice, updateDeviceLastUsed } from "../lib/deviceFingerprint.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }

    // basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be a length of 6" });
    }
    // Reject disposable / temporary emails
    const disposable = await isDisposableEmail(email);
    if (disposable) {
      return res.status(400).json({ message: "Unauthorized mail" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // Create user but require OTP verification before issuing JWT
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

    const newUser = new User({
      username: username,
      email: email,
      password: hashedpassword,
      isVerified: false,
      otp,
      otpExpires,
    });

    await newUser.save();

    // send otp
    try {
      const mailResult = await sendOtpEmail({ to: email, otp });
      const preview = mailResult && mailResult.preview;
      const resp = { message: 'OTP_SENT', email: newUser.email };
      if (preview && process.env.NODE_ENV === 'development') resp.preview = preview;
      return res.status(201).json(resp);
    } catch (mailErr) {
      console.error('Error sending OTP email', mailErr);
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }
  } catch (error) {
  console.error("Error in Signup:", error && (error.message || error));
  console.error(error && error.stack);
  res.status(500).json({ message: "Internal Server Error", error: process.env.NODE_ENV === 'development' ? (error && error.message) : undefined });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordcorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordcorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate device fingerprint
    const deviceFingerprint = generateDeviceFingerprint(req);
    const userAgent = req.headers['user-agent'] || '';

    // Check if user is verified and device is trusted
    const deviceTrusted = isDeviceTrusted(user, deviceFingerprint);

    if (!user.isVerified || !deviceTrusted) {
      // Send OTP for unverified users or new/untrusted devices
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
      
      try {
        const mailResult = await sendOtpEmail({ to: email, otp });
        const preview = mailResult && mailResult.preview;
        const resp = { 
          message: 'OTP_SENT', 
          email: user.email,
          reason: !user.isVerified ? 'account_not_verified' : 'new_device'
        };
        if (preview && process.env.NODE_ENV === 'development') resp.preview = preview;
        return res.status(200).json(resp);
      } catch (mailErr) {
        console.error('Error sending OTP email', mailErr);
        return res.status(500).json({ message: 'Failed to send OTP email' });
      }
    }

    // Update device last used time for trusted devices
    await updateDeviceLastUsed(user, deviceFingerprint);
    
    // Update last login time
    user.lastLoginAt = new Date();
    await user.save();

    // If verified and trusted device, issue token as before
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.log("Error while logging the user", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.isVerified && isDeviceTrusted(user, generateDeviceFingerprint(req))) {
      return res.status(200).json({ message: 'ALREADY_VERIFIED' });
    }

    if (!user.otp || !user.otpExpires) return res.status(400).json({ message: 'No OTP found' });

    if (new Date() > user.otpExpires) return res.status(400).json({ message: 'OTP_EXPIRED' });

    if (user.otp !== otp) return res.status(400).json({ message: 'INVALID_OTP' });

    // Mark user as verified and add device as trusted
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    user.lastLoginAt = new Date();
    
    // Add current device as trusted
    const deviceFingerprint = generateDeviceFingerprint(req);
    const userAgent = req.headers['user-agent'] || '';
    await addTrustedDevice(user, deviceFingerprint, userAgent);

    // issue token now
    generateToken(user._id, res);

    return res.status(200).json({ 
      message: 'VERIFIED', 
      _id: user._id, 
      email: user.email, 
      username: user.username,
      profilepic: user.profilepic
    });
  } catch (err) {
    console.error('verifyOtp error', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.isVerified) return res.status(200).json({ message: 'ALREADY_VERIFIED' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 1000 * 60 * 10);
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    try {
      const mailResult = await sendOtpEmail({ to: email, otp });
      const preview = mailResult && mailResult.preview;
      const resp = { message: 'OTP_SENT' };
      if (preview && process.env.NODE_ENV === 'development') resp.preview = preview;
      return res.status(200).json(resp);
    } catch (mailErr) {
      console.error('Error sending OTP email', mailErr);
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }
  } catch (err) {
    console.error('resendOtp error', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(205).json("Logged Out Successfully");
  } catch (error) {
    console.log("Error while logging out the user", error.message);
    res.status(502).json("Internal Server Error");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const user = req.user._id;
    if (!profilepic) {
      res.status(407).json({ message: "Profile pic is required" });
    }

    const uploadPic = await cloudinary.uploader.upload(profilepic);
    const updateUser = await User.findByIdAndUpdate(
      user,
      { profilepic: uploadPic.secure_url },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(
      "Something went wrong while uploading the profilepic",
      error.message
    );
    res.status(500).json({ message: "Internal Server error" });
  }
};

// export const check = (req, res) => {
//   try {
//     res.status(200).json(req.user);
//   } catch (error) {
//     console.log("Error in checking user authentication", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
