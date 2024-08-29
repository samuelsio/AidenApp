import React from 'react';
import Header from '../../components/Header';
import ClansList from '../../components/ClansList';
import "./Clans.scss";
import ClanData from './ClanData.json'
import { useParams } from 'react-router-dom';
import ClanDetailView from '../../components/ClanDetailView';

export default function Clans() {
  const {Clanname: ClanNameParam} = useParams();
  const clan = ClanData.Clans.find(clan => clan.ClanName === ClanNameParam); // Find the clan by name

    if (ClanNameParam && !clan) {
      return (
        <>
          <Header activeItem={"clans"}/>
          <h1>Clan Not Found</h1>;
        </>)}; //If the url is clans/Not Valid Clan
    
    if (!ClanNameParam) {
      return (
        <>
          <Header activeItem={"clans"}/>
          <ClansList />
        </>)}; //If the url follows clans/

  return (
    <>
      <Header activeItem={"clans"}/>
      <ClanDetailView
      clan={clan}
      />
    </>)}; //If the url follows clans/Valid Clan
