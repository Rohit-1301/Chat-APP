import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    profilepic: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    trustedDevices: [{
      fingerprint: String,
      userAgent: String,
      lastUsed: Date,
      verifiedAt: Date,
    }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
