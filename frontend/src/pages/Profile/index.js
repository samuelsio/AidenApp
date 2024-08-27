import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import ProfileComponent from '../../components/ProfileComponent';
import "./Profile.scss";
import friendsData from "./friendsData.json"

export default function Profile() {
  const {username} = useParams();
  const userProfile = friendsData.friends.find(friend => friend.username === username);

  return (
    <>
      <Header activeItem={"profile"}/>
      <div className='Profile'>
          {userProfile ? <ProfileComponent user={userProfile}/> : <h1>ERROR 404: User not found please check spelling</h1>}
      </div>

    </>
  )
}