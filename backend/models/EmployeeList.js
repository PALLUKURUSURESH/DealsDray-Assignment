const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: [String],
  photo: { type: String, required: false }, // Storing the filename for the uploaded photo
});

module.exports = mongoose.model('EmployeeList', employeeSchema);
