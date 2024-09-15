const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Employee = require('./models/Employee'); // Ensure the correct path
const EmployeeList = require('./models/EmployeeList'); // Ensure the correct path

const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Registration Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newEmployee = new Employee({
      username,
      email,
      password: hashedPassword,
    });

    await newEmployee.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newEmployee._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully!',
      token,
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Find user by username
    const user = await Employee.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful!',
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create Employee Route
app.post('/create-employee', upload.single('photo'), async (req, res) => {
  const { name, email, mobileNo, designation, gender, courses } = req.body;
  const photo = req.file ? req.file.filename : null;

  // Basic validation
  if (!name || !email || !mobileNo || !designation || !gender) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Create new employee
    const newEmployee = new EmployeeList({
      name,
      email,
      mobileNo,
      designation,
      gender,
      courses: JSON.parse(courses),
      photo,
    });

    await newEmployee.save();

    res.status(201).json({
      message: 'Employee created successfully!',
    });

  } catch (error) {
    console.error('Error during employee creation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://pallukurusuresh04:P%40suresh123@backenddb.vsuzr.mongodb.net/machine?retryWrites=true&w=majority&appName=backendDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connected');
    // Start the server only if DB connection is successful
    app.listen(5000, () => {
      console.log('Server running at http://localhost:5000');
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
