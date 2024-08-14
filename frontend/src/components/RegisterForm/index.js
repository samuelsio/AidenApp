import React, { useState} from 'react';
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
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];

    if (!registerData.username) errors.push({errorName: 'Username is not filled', id:'username'})
    if (!registerData.email) errors.push({errorMessage: 'Email is not filled', id:'email'})
    if (!registerData.fName) errors.push({errorMessage: 'First Name is not filled', id:'fName'})
    if (!registerData.lName) errors.push({errorMessage: 'Last Name is not filled', id:'lName'})
    if (!registerData.password) errors.push({errorMessage: 'Password is not filled', id:'password'})
    if (!registerData.confirmPassword) errors.push({errorMessage: 'Confirm Password is not filled', id:'confirmPassword'})
    if (!registerData.dob) errors.push({errorMessage: 'Date of Birth is not filled', id:'dob'})
    if (!registerData.gender) errors.push({errorMessage: 'Gender is not filled', id:'gender'})
    if (registerData.password !== registerData.confirmPassword) errors.push({errorMessage: 'Passwords dont match', id:'confirmPassword'})
    
    const checkEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,8}){1,2}$/;
    if (!checkEmail.test(registerData.email)) {
      errors.push({errorMessage: 'Email', id:'email'})
    }

    const checkPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!checkPassword.test(registerData.password)) {
      errors.push({errorMessage:` Password must contain a number, a lower AND uppercase letter, must be over 8 characters long, and contain a symbol (&!./)`, id:'password'})
    }

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
          {formError.length > 0 &&(
            <div className='errors'>
              <h3 className='errorsHeader'>Fucko Wucko Occured:</h3>
              <ul>
                {formError.map((error, index) => (
                  <li key={index}>
                  <a className='errorField' href={`#${error.id}`} >{error.errorMessage}</a>
                  </li>
                  ))}
              </ul>
            </div>
          )}
          <form className='register-form' onSubmit={handleSubmit}>
              <input className='form-input' type="text" name='username' id='username' placeholder='Username' value={registerData.username} onChange={handleChange} />
              <input className='form-input' type="text"  name='email' id='email' placeholder='Email' value={registerData.email} onChange={handleChange} />
              <input className='form-input' type='text' name='fName' id='fName' placeholder='First Name' value={registerData.fName} onChange={handleChange} />
              <input className='form-input' type='text' name='lName' id='lName' placeholder='Last Name' value={registerData.lName} onChange={handleChange} />
              <input className='form-input' type="password" name='password' id='password' placeholder='Password' title='Password must contain: at least 8 characters, an Uppercase, a Lowercase letterm and a number' value={registerData.password} onChange={handleChange} />
              <input className='form-input' type="password" name='confirmPassword' id='confirmPassword'  placeholder='Confirm Password' value={registerData.confirmPassword} onChange={handleChange} />
              
              <input className='dob' type="date" name='dob' id='dob' value={registerData.dob} onChange={handleChange} />
              <div className='switch' id='gender'>
                <label className='switch__male' >
                  <input className='form-switch' type='radio' name='gender' id='male' value='Male' checked={registerData.gender === 'Male'} onChange={handleChange} />Male
                </label>
                  
                <label className='switch__female' >
                  <input className='form-switch' type='radio' name='gender' id='female' value='Female' checked={registerData.gender === 'Female'} onChange={handleChange}/>Female
                </label> 
                  
                <label className='switch__other' >
                  <input className='form-switch' type='radio' name='gender' id='other' value='Other' checked={registerData.gender === 'Other'} onChange={handleChange}/>Other
                </label>

              </div>
              <Button variant="primary" large={false} label='Create Account' type='submit' fontSize='large' fullWidth={false}/>  
              </form>
              
          <p className='register-link'>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
      <div className='image-container'>
        <img src={regPoster} className='login-image' alt='Oh fucko wucko' />
      </div>
      </div>
  )
};