import express from 'express';
import jwt from 'jsonwebtoken';
const jwt_secret = process.env.SECRET_KEY;


export function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing or invalid" });
  }

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Store user info in request
    next();
  });
}


