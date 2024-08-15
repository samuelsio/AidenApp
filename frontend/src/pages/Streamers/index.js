import React from 'react';
import Header from '../../components/Header';
import StreamCardList from '../../components/StreamCardList';
import "./Streamers.scss";
import streamersData from "./streamersData.json"



export default function Streamers() {
  
  const { category } = streamersData;
  
  console.log(category);
  
  
  return (
    <>
    <Header activeItem={"streamers"}/>
    <div className='Streamers'>
        <h1>Streamers</h1>
    </div>
    <StreamCardList />
    </>
  )
}