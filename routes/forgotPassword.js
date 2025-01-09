const express = require("express");
const crypto = require("crypto");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found!" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.tokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    console.log(`Reset Token (send via email): ${resetToken}`);

    res.status(200).json({ message: "Password reset email sent!", resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send reset email!" });
  }
});

module.exports = router;
