import React from 'react';
import Header from '../../components/Header';
import SocialComponent from '../../components/SocialComponent';
import "./Social.scss";

export default function Social() {
  return (
    <>
    <Header activeItem={"social"}/>
    <div className='Social'>
        <h1>Social</h1>
    </div>
    <SocialComponent />
    </>
  )
}