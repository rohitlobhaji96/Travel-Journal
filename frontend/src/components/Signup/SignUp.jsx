import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import Navbar from "../Navbar";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", user);
      setMessage(response.data);
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error.response?.data);
      setMessage(error.response?.data || 'Signup failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <h2>Create Your Account ✈️</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create a Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
          {message && <p style={{ marginTop: '10px', color: '#f55a5a' }}>{message}</p>}
          <p style={{ marginTop: '15px' }}>
            Already have an account? <a href="/" style={{ color: '#007bff' }}>Log in here</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;