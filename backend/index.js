const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Employee = require('./models/Employee');
const EmployeeList = require('./models/EmployeeList');

const app = express();

// Enable CORS
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
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new Employee({ username, email, password: hashedPassword });
    await newEmployee.save();
    const token = jwt.sign({ userId: newEmployee._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const user = await Employee.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create Employee Route
app.post('/create-employee', upload.single('photo'), async (req, res) => {
  const { name, email, mobileNo, designation, gender, courses } = req.body;
  const photo = req.file ? req.file.filename : null;
  if (!name || !email || !mobileNo || !designation || !gender) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
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
    res.status(201).json({ message: 'Employee created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get All Employees Route
app.get('/get-employees', async (req, res) => {
  try {
    const employees = await EmployeeList.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
});

// Get Single Employee by ID Route
app.get('/get-employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeList.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
});

// Delete Employee Route
app.delete('/delete-employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeList.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
});


// Update Employee Route
app.put('/update-employee/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { name, email, mobileNo, designation, gender, courses } = req.body;
  const photo = req.file ? req.file.filename : null;

  if (!name || !email || !mobileNo || !designation || !gender) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const updatedEmployee = await EmployeeList.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobileNo,
        designation,
        gender,
        courses: JSON.parse(courses),
        photo: photo ? photo : undefined,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully!', employee: updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
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
    app.listen(5000, () => {
      console.log('Server running at http://localhost:5000');
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
