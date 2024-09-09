import React from 'react';
import Header from '../../components/Header';
import GamesCard from '../../components/GamesCard/index.js';
import "./Games.scss";


export default function Games() {

  return (
    <>
    <Header activeItem={"games"}/>
    <div className='Games'>
      <h1>GamePage</h1>
    </div>
    <GamesCard />
    </>
  )
}
