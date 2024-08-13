import React from 'react';
import { Link } from 'react-router-dom';
import "./LoginForm.scss";
import poster from "../../images/HelldiversPoster.png";
import Button from '../Button';

export default function LoginForm() {
  return (
    <div className='parent'>
    <div className='container'>
        <div className='card-top'>
            <h1 className='title'>Welcome back!</h1>
            <p className='paragraph'>Find new friends, explore upcoming streamers, and get updates on current sales  -  All here for you</p>
        </div>
        <form className='login-form'>
            <input className='form-input' type="email" id='email' placeholder='Email' />
            <input className='form-input' type="password" placeholder='Password' />
            <Button variant="primary" large={false} label='Sign In' type='button' fontSize='large' fullWidth={false}/>
        </form>
        <p className='register-link'>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
    <div className='image-container'>
      <img src={poster} className='login-image' alt='Oh fucko wucko' />
    </div>
    </div>
  );
}
