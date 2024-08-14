import React from 'react';
import Header from '../../components/Header';
import ClansComponent from '../../components/ClansComponent';
import "./Clans.scss";

export default function Clans() {
  return (
    <>
    <Header />
    <div className='Clans'>
        <h1>Clans</h1>
    </div>
    <ClansComponent />
    </>
  )
}