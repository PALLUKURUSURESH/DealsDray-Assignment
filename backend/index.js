const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model/Employee'); // Make sure to update the path if needed

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Registration Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully!',
      token
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

mongoose.connect("mongodb+srv://pallukurusuresh:P%40suresh123@backenddb.vsuzr.mongodb.net/machine?retryWrites=true&w=majority&appName=backendDB")
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.error("Database connection error", e);
  });
