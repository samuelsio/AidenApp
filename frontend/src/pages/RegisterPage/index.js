import React from 'react'
import Header from '../../components/Header';
import RegisterForm from '../../components/RegisterForm';
import "./RegisterPage.scss";


export default function RegisterPage() {
  return (
    <>
        <Header />
        <div className='RegisterPage'></div>
        <RegisterForm />
    </>
  )
}
