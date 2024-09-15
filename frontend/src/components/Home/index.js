
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css'; // Ensure this file is created for styling

const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setCourses((prev) =>
      checked ? [...prev, value] : prev.filter((course) => course !== value)
    );
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobileNo', mobileNo);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('courses', JSON.stringify(courses));
    formData.append('photo', photo);

    try {
      const response = await axios.post('http://localhost:5000/create-employee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Employee created successfully!');
    } catch (error) {
      console.error('Error creating employee:', error);
      setMessage('Error creating employee');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Employee Management</h1>
        <nav>
          <a href="/home">Home</a>
          <a href="/employees">Employee List</a>
          <span className="username">{localStorage.getItem('username')}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>
      <div className="form-container">
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNo">Mobile No:</label>
            <input
              type="text"
              id="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation:</label>
            <select
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Managers">Managers</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
          <div className="form-group">
            <label>Courses:</label>
            <label>
              <input
                type="checkbox"
                value="MCA"
                checked={courses.includes('MCA')}
                onChange={handleCourseChange}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BCA"
                checked={courses.includes('BCA')}
                onChange={handleCourseChange}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BSE"
                checked={courses.includes('BSE')}
                onChange={handleCourseChange}
              />
              BSE
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="photo">Upload Photo:</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Home;
