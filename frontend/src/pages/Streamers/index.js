import React from 'react';
import Header from '../../components/Header';
import StreamersComponent from '../../components/StreamersComponent';
import "./Streamers.scss";

export default function Streamers() {
  return (
    <>
    <Header activeItem={"streamers"}/>
    <div className='Streamers'>
        <h1>Streamers</h1>
    </div>
    <StreamersComponent />
    </>
  )
}