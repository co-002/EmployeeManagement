import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      success: false,
      message: "Token not provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
