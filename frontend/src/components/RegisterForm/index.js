import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import regPoster from "../../images/RegisterPoster.jpg";
import Button from '../Button';
import "./RegisterForm.scss"



export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    username:'',
    email:'',
    fName:'',
    lName:'',
    password:'',
    confirmPassword:'',
    dob:'',
    gender:'',
  })

  const [formError, setFormError] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefualt();

    const errors = [];

    if (!registerData.username) errors.push('Username')
    if (!registerData.email) errors.push('Email')
    if (!registerData.fName) errors.push('First Name')
    if (!registerData.lName) errors.push('Last Name')
    if (!registerData.password) errors.push('Password')
    if (!registerData.confirmPassword) errors.push('Confirm Password')
    if (!registerData.dob) errors.push('Date of Birth')
    if (!registerData.gender) errors.push('Gender')
    
    setFormError(errors);
    if (errors.length === 0) {
      console.log('sucess', registerData)
    }

  }


  return (
      <div className='parent'>
      <div className='container'>
          <div className='card-top'>
              <h1 className='title' >Welcome new person!</h1>
              <p className='paragraph'>Sign up now and start searching for new friends, join public events, create new clans, meet people to play the games you enjoy, and find related games on sale</p>
          </div>
          <form className='register-form' onSubmit={handleSubmit}>
              <input className='form-input' type="text" placeholder='Username' value={registerData.username} onChange={handleChange} />
              <input className='form-input' type="text" id='email' placeholder='Email' value={registerData.email} onChange={handleChange} />
              <input className='form-input' type='text' id='fName' placeholder='First Name' value={registerData.fName} onChange={handleChange} />
              <input className='form-input' type='text' id='lName' placeholder='Last Name' value={registerData.lName} onChange={handleChange} />
              <input className='form-input' type="password" name='confirm-password' id='confirm-password'  placeholder='Confirm Password' value={registerData.confirmPassword} onChange={handleChange} />
              <input className='form-input' type="password" name='password' id='password'pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder='Password' title='Password must contain: at least 8 characters, an Uppercase, a Lowercase letterm and a number' value={registerData.password} onChange={handleChange} />
              <input className='form-input' type="date" name='dob' id='dob' value={registerData.dob} onChange={handleChange} />
              <div className='switch'>
                <label className='switch__male'><input className='form-switch' type='radio' name='gender' id='male' value='Male' />Male</label>
                  
                <label className='switch__female'> <input className='form-switch' type='radio' name='gender' id='female' value='Female' />Female</label> 
                  
                <label className='switch__other'><input className='form-switch' type='radio' name='gender' id='other' value='Other' />Other</label>
              </div>
              <Button variant="primary" large={false} label='Create Account' type='button' fontSize='large' fullWidth={false}/>  

              </form>
          <p className='register-link'>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
      <div className='image-container'>
        <img src={regPoster} className='login-image' alt='Oh fucko wucko' />
      </div>
      </div>
  )
};