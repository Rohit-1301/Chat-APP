import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
  verifyOtp,
  resendOtp,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// OTP endpoints
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);

router.put("/update-profile", protectRoute, updateProfile);

// Change this to match frontend call
router.get("/check-auth", protectRoute, checkAuth);

export default router;