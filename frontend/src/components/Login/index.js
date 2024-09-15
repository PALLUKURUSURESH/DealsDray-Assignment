
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // Import Axios
import './index.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const [message, setMessage] = useState(''); // To display server messages
    const navigate = useNavigate(); // To handle navigation

    const validateForm = () => {
        let isValid = true;
        let errors = { username: '', password: '' };

        if (username.trim() === '') {
            errors.username = 'Username is required';
            isValid = false;
        }
        if (password.trim() === '') {
            errors.password = 'Password is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:5000/login', {
                    username,
                    password,
                });
    
                // On successful login, store the JWT token in local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user',username)
    
                // Redirect to the home page
                navigate('/');
            } catch (error) {
                // Log the full error response for debugging
                console.error('Login error:', error);
                setMessage(error.response?.data?.message || 'Server error');
            }
        }
    };
    

    return (
        <div className="login-container">
            <motion.div
                className="form-wrapper"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button type="submit">Login</button>
                    {message && <p className="error">{message}</p>} {/* Display login error */}
                    <p>If you didn't have an account? <Link to='/register'><span>Register</span></Link> </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
