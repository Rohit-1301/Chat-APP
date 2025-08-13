import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(4004).json({ message: "Unauthorized token" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      res.status(4004).json({ message: "Unauthorized decode token" });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User is not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protected route middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
