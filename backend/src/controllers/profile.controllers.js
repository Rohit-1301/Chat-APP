import User from "../models/user.models.js";
import cloudinary from "../lib/cloudinary.js";
import bcryptjs from "bcryptjs";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getProfile controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email, profilepic } = req.body;
    const userId = req.user._id;

    // Check if username is already taken by another user
    if (username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: userId } 
      });
      
      if (existingUser) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    // Check if email is already taken by another user
    if (email) {
      const existingEmail = await User.findOne({ 
        email, 
        _id: { $ne: userId } 
      });
      
      if (existingEmail) {
        return res.status(400).json({ message: "Email is already taken" });
      }
    }

    let imageUrl;
    if (profilepic) {
      // Upload image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(profilepic);
      imageUrl = uploadResponse.secure_url;
    }

    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (imageUrl) updateFields.profilepic = imageUrl;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log("Error in updateProfile controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;

    if (!profilepic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Upload image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile picture updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log("Error in uploadProfilePicture controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete user account
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Account deleted successfully" });

  } catch (error) {
    console.log("Error in deleteAccount controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new passwords are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }

    // Get user with password
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password is correct
    const isCurrentPasswordCorrect = await bcryptjs.compare(currentPassword, user.password);
    if (!isCurrentPasswordCorrect) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedNewPassword = await bcryptjs.hash(newPassword, 12);

    // Update password
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    res.status(200).json({ message: "Password changed successfully" });

  } catch (error) {
    console.log("Error in changePassword controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    // For now, return mock stats. In a real app, you'd query messages/chats collections
    const stats = {
      totalChats: 12,
      totalMessages: 234,
      friendsCount: 8,
      memberSince: user.createdAt,
      accountAge: Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))
    };

    res.status(200).json(stats);

  } catch (error) {
    console.log("Error in getUserStats controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
