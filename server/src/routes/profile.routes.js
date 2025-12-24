import express from "express";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import { 
  getProfile, 
  updateProfile, 
  uploadProfilePicture, 
  deleteAccount,
  changePassword,
  getUserStats 
} from "../controllers/profile.controllers.js";

const router = express.Router();

// Get user profile
router.get("/", protectRoute, getProfile);

// Update user profile
router.put("/update", protectRoute, updateProfile);

// Upload profile picture
router.post("/upload-picture", protectRoute, uploadProfilePicture);

// Change password
router.put("/change-password", protectRoute, changePassword);

// Get user statistics
router.get("/stats", protectRoute, getUserStats);

// Delete user account
router.delete("/delete", protectRoute, deleteAccount);

export default router;
