import React from 'react';
import Header from '../../components/Header';
import GamesComponent from '../../components/GamesComponent';
import "./Games.scss";

export default function Games() {
  return (
    <>
    <Header activeItem={"games"}/>
    <div className='Games'>
        <h1>Games</h1>
    </div>
    <GamesComponent />
    </>
  )
}
