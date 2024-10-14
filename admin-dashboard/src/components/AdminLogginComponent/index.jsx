import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminLogginComponent() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
    const response = await fetch('http://localhost:3011/users/adminPortal', {
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
        console.log('Login successful', {data});
        
        // Navigate to a protected page or dashboard
        navigate(`/`); // or any other protected route
    } else {
        setError(data.error || 'Login failed. Please try again.');
    }
    } catch (err) {
    setError('An error occurred during login. Please try again later.');
    console.error('Login error:', err);
    }
};
    return (
        <div className="d-flex flex-column bg-secondary text-white w-100 h-100 p-2">
            {error && <p className="error">{error}</p>}
            <form className='d-flex flex-column justify-content-evenly h-100' onSubmit={handleLogin}>
                <div className='mb-3'>
                    <input
                        className='form-input w-100 '
                        type="email"
                        id='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <input
                        className='form-input w-100'
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    )
}