import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post("/verifyToken", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    res.status(200).json({ valid: true, decoded });
  } catch (err) {
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET_KEY);
    const newAccessToken = jwt.sign(
      {
        userID: decoded.userID,
        username: decoded.username,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});

export default router;
