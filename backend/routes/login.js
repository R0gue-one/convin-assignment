import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

const jwt_secret = process.env.SECRET_KEY;


router.post('/', async (req, res) => {
  if (!global.db) {
    return res.status(500).json({ message: "Database not connected" });
  }

  const userdata = req.body;
  const users = global.db.collection('users');
  try {
    const foundUser = await users.findOne({ email: userdata.email });

    if (foundUser) {
      if (foundUser.password === userdata.password) {
        // Generate JWT token on successful login
        const token = jwt.sign({ email: foundUser.email }, jwt_secret, { expiresIn: '1h' });

        res.status(200).json({ 
          message: "Login successful",
          token: token,
          user: userdata.email,
          name: foundUser.name 
        });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (err) {
    console.error('Error finding user', err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

