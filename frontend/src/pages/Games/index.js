import React from 'react';
import Header from '../../components/Header';
import GamesCard from '../../components/GamesCard';
import "./Games.scss";
import gamesData from "./dataGames.json";


export default function Games() {


  const {games} = gamesData;

  return (
    <>
    <Header activeItem={"games"}/>
    <div className='Games'>
      <h1>GamePage index.js</h1>
    </div>
    <GamesCard />
    </>
  )
}
