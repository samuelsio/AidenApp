import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import regPoster from "../../images/RegisterPoster.jpg";
import Button from '../Button';

export default function Dashboard({user, friends}) {
  const [darkMode, setDarkmode] = useState(false);
  const [showCookieMessage, setShowCookieMessage] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  useEffect(() => {
    if (password === confirmPassword) {
      console.log("it matches");
    } else {
      console.log("No match")
    }
  
  }, [password, confirmPassword])
  

  return (
      <div className='parent'>
      <div className='container'>
          <div className='card-top'>
              <h1 className='title'>Welcome new user!</h1>
              <p>Your password is: {password}</p>
              <p>Your confirm password is: {confirmPassword}</p>
              <p className='paragraph'>Sign up now and start searching for new friends, join public events, create new clans, meet people to play the games you enjoy, and find related games on sale</p>
          </div>
          <form className='login-form'>
              <input className='form-input' type="text" placeholder='Username' />
              <input className='form-input' type="text" id='email' placeholder='Email' />
              <input className='form-input' type="password" name='confirm-password' id='confirm-password'  placeholder='Confirm Password' onChange={(event) => {setPassword(event.target.value)}} />
              <input className='form-input' type="password" name='password' id='password'pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder='Password' title='Password must contain: at least 8 characters, an Uppercase, a Lowercase letterm and a number' onChange={(event) => {setConfirmPassword(event.target.value)}} />
              <button className={`form-button`} id='button' type='submit' disabled={(password === confirmPassword) ? false : true} >Create Account</button>
              <Button variant="Primary" />  

              </form>
          <p className='register-link'>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
      <div className='image-container'>
        <img src={regPoster} className='login-image' alt='Oh fucko wucko' />
      </div>
      </div>
  )
};