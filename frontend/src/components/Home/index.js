import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [employees, setEmployees] = useState([]); // State to store employee list
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
      setName('');
      setEmail('');
      setMobileNo('');
      setDesignation('');
      setGender('');
      setCourses([]);
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
      <nav className="menu-bar">
        <Link to='/'>Home</Link>
        <Link to='/employee-list'>Employee List</Link>
        <h3>Profile: <span className="username">{localStorage.getItem('user')}</span></h3>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>

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
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <div className="radio-group">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </div>
          </div>
          <div className="form-group">
            <label>Courses:</label>
            <div className="checkbox-group">
              <input
                type="checkbox"
                value="MCA"
                checked={courses.includes('MCA')}
                onChange={handleCourseChange}
              />
              MCA
              <input
                type="checkbox"
                value="BCA"
                checked={courses.includes('BCA')}
                onChange={handleCourseChange}
              />
              BCA
              <input
                type="checkbox"
                value="BSC"
                checked={courses.includes('BSC')}
                onChange={handleCourseChange}
              />
              BSC
            </div>
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

  )
}


export default Home;
