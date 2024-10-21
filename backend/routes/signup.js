import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

const jwt_secret = process.env.SECRET_KEY;

router.post('/', async (req, res) => {
  let userdata = req.body;
  

  userdata.friends = [];
  try {
    const users = global.db.collection('users');
    const foundUser = await users.findOne({ email: userdata.email });

    if (foundUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    await users.insertOne(userdata);

    // Optionally, generate JWT token after signup
    const token = jwt.sign({ email: userdata.email }, jwt_secret, { expiresIn: '1h' });

    res.status(200).json({
      message: "Signup successful",
      user: userdata.email,
      token: token
    });

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
