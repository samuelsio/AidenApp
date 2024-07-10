import React from 'react';
import Header from '../../components/Header';
import LoginForm from '../../components/LoginForm';
import "./LoginPage.scss";

export default function LoginPage() {
  return (
    <>
    <Header />
    <div className='LoginPage'></div>
    <LoginForm />
    </>
  )
}
