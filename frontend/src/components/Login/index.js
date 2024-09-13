import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom'
import './index.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Username:', username);
            console.log('Password:', password);
            // Handle form submission logic here
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
                    <p>If you did'n have Account ?<Link to='/register'><span>Register</span></Link> </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
