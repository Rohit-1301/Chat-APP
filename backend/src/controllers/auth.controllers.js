import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Password must be a length of 6" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be a length of 6" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedpassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilepic: newUser.profilepic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in Signup");
    res.status(500).json({ message: "Internal Server Error" });
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
      "Something went wron while uploading the profilepic",
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
