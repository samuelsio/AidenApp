import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import regPoster from "../../images/RegisterPoster.jpg";
import Button from '../Button';

export default function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (password === confirmPassword) {
      console.log("it matches");
    } else {
      console.log("No match")
    }
  }, [password, confirmPassword])

  useEffect(() => {
    console.log({email})
  })

  return (
      <div className='parent'>
      <div className='container'>
          <div className='card-top'>
              <h1 className='title' >Welcome {username}!</h1>
              <p className='paragraph'>Sign up now and start searching for new friends, join public events, create new clans, meet people to play the games you enjoy, and find related games on sale</p>
          </div>
          <form className='login-form'>
              <input className='form-input' type="text" placeholder='Username' onChange={(event) => {setUsername(event.target.value)}} />
              <input className='form-input' type="text" id='email' placeholder='Email' onChange={(event) => {setEmail(event.target.value)}} />
              <input className='form-input' type="password" name='confirm-password' id='confirm-password'  placeholder='Confirm Password' onChange={(event) => {setPassword(event.target.value)}} />
              <input className='form-input' type="password" name='password' id='password'pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder='Password' title='Password must contain: at least 8 characters, an Uppercase, a Lowercase letterm and a number' onChange={(event) => {setConfirmPassword(event.target.value)}} />
              <Button variant="Primary" large={false} disabled={(password === confirmPassword) ? false : true} label='Create Account' type='button' fontSize='large' fullWidth={false}/>  

              </form>
          <p className='register-link'>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
      <div className='image-container'>
        <img src={regPoster} className='login-image' alt='Oh fucko wucko' />
      </div>
      </div>
  )
};