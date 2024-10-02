import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./LoginForm.scss";
import poster from "../../images/HelldiversPoster.png";
import Button from '../Button';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:3011/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT token in localStorage or sessionStorage
        localStorage.setItem('token', data.token);
        console.log('Login successful', data);
        
        // Navigate to a protected page or dashboard
        navigate('/profile'); // or any other protected route
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className='parent'>
      <div className='container'>
        <div className='card-top'>
          <h1 className='title'>Welcome back!</h1>
          <p className='paragraph'>
            Find new friends, explore upcoming streamers, and get updates on current sales  -  All here for you
          </p>
        </div>
        {error && <p className="error">{error}</p>}
        <form className='login-form' onSubmit={handleLogin}>
          <input
            className='form-input'
            type="email"
            id='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='form-input'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="primary" large={false} label='Sign In' type='submit' fontSize='large' fullWidth={false} />
        </form>
        <p className='register-link'>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <div className='image-container'>
        <img src={poster} className='login-image' alt='Oh fucko wucko' />
      </div>
    </div>
  );
}