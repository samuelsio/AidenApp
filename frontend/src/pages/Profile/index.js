import React from 'react';
import Header from '../../components/Header';
import ProfileComponent from '../../components/ProfileComponent';
import "./Profile.scss";

export default function Profile() {
  return (
    <>
    <Header />
    <div className='Profile'>
        <h1>Profile</h1>
    </div>
    <ProfileComponent />
    </>
  )
}