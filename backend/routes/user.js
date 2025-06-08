import express from "express";
import { login, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/verify", isAuthenticated, async (req, res) => {
  res.json({ success: true, user: req.userId });
});
router.get("/auth/logout", isAuthenticated, (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;
