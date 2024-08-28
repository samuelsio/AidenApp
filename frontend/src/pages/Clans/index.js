import React from 'react';
import Header from '../../components/Header';
import ClansList from '../../components/ClansList';
import "./Clans.scss";
import ClanData from './ClanData.json'
import { useParams } from 'react-router-dom';

export default function Clans() {
  const {ClanName} = useParams();
  const clan = ClanData.Clans.find(clan => clan.ClanName === ClanName); // Find the clan by name

    if (ClanName && !clan) {
      return (
        <>
          <Header activeItem={"clans"}/>
          <h1>Clan Not Found</h1>;
        </>)}; //If the url is clans/Not Valid Clan
    
    if (!ClanName) {
      return (
        <>
          <Header activeItem={"clans"}/>
          <ClansList />
        </>)}; //If the url follows clans/

  return (
    <>
      <Header activeItem={"clans"}/>
      <div className='Clans'>
          <h1>{clan.ClanName}</h1>
      </div>
    </>)}; //If the url follows clans/Valid Clan
