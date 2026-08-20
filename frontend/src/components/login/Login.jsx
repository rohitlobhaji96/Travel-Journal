import React, { useState } from 'react';
import './Login.css';
import axios from 'axios'; // Make sure you install axios
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store JWT

      setMessage(response.data); // Show success message
      console.log('Login successful:', response.data);
      navigate('/journal');


      // Navigate to dashboard or save token here
    } catch (error) {
      console.error('Login error:', error.response?.data);
      setMessage(error.response?.data || 'Login failed');
    }
  };

  return (
    <>
    <Navbar/>
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">Welcome Back!</h2>
            <form onSubmit={handleLogin}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <label>Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button type="submit" className="login-btn">Login</button>
            
              <p style={{ marginTop: '15px' }}>
    Don't have an account? <a href="/signup" style={{ color: '#007bff' }}>Sign up here</a>
  </p>
            </form>
          </div>
        </div>
    </>
  );
};

export default Login;