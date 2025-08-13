import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  check,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, check);

export default router;
