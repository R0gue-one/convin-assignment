import express from 'express';
import {authenticate} from '../utils/auth.js';
const router = express.Router();


router.post('/', authenticate, async (req, res) => {
  if (!global.db) {
    return res.status(500).json({ message: "Database not connected" });
  }

  const { friendEmail } = req.body;
  const userEmail = req.user.email; // Get user email from token

  // Input validation
  if (!friendEmail) {
    return res.status(400).json({ message: "friendEmail is required" });
  }

  try {
    const users = global.db.collection('users');

    // Check if the friend exists
    const friendExists = await users.findOne({ email: friendEmail });
    if (!friendExists) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Update the user's friends list
    const updateResult = await users.updateOne(
      { email: userEmail },
      { $addToSet: { friends: friendEmail } } 
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found or friend already added" });
    }

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
