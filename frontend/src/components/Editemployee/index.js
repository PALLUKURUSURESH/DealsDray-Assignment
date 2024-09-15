import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams,Link } from 'react-router-dom';
import './index.css';

const EditEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-employee/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const emp = response.data;
        setEmployee(emp);
        setName(emp.name);
        setEmail(emp.email);
        setMobileNo(emp.mobileNo);
        setDesignation(emp.designation);
        setGender(emp.gender);
        setCourses(emp.courses);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setMessage('Error fetching employee data');
      }
    };

    fetchEmployee();
  }, [id]);

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
    if (photo) formData.append('photo', photo);

    try {
      await axios.put(`http://localhost:5000/update-employee/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Employee updated successfully!');
      setName('');
      setEmail('');
      setMobileNo('');
      setDesignation('');
      setGender('');
      setCourses([]);
    } catch (error) {
      console.error('Error updating employee:', error);
      setMessage('Error updating employee');
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      <div className='navigation-container'>
        <Link to="/"><p className='para'>Create Employee</p></Link>
       <Link to="/employee-list"><p className='para'>Employee list</p></Link>
      </div>
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
  );
};

export default EditEmployee;
