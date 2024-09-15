const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNo: String,
  designation: String,
  gender: String,
  courses: [String],
  photo: String
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
