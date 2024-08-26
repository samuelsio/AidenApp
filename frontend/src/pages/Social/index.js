import React from 'react';
import Header from '../../components/Header';
import "./Social.scss";
import SocialList from '../../components/SocialList/index';

export default function Social() {
  return (
    <>
    <Header activeItem={"social"}/>
    <div className='Social'>
        <h1>Social</h1>
    </div>
    <SocialList />
    </>
  )
}