import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate
import './index.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
      });

      setMessage('Registration successful!');
      
      // Redirect to the login page after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds (optional delay)

    } catch (error) {
      setMessage(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className='register-container'>
      <div className='form-wrapper'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <p>If you have account ?<Link to="/login">Login</Link></p>
      </form>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
