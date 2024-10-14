import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import ProfileComponent from '../../components/ProfileComponent';
import "./Profile.scss";

export default function Profile() {
  const { username } = useParams(); 
  const [userProfile, setUserProfile] = useState(null); // State to store the user profile
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(''); // State to store any error messages

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        const response = await fetch(`http://localhost:3011/users/profile/${username}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}`},
        });
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data); 
        } else {
          setError('User not found. Please check the spelling.');
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('An error occurred while fetching the user profile.');
      }
    };

    fetchUserProfile(); // Call the function when the component mounts
  }, [username]); // Re-run the effect if the username changes

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        const response = await fetch(`http://localhost:3011/users/token`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}`},
        });
        if (response.ok) {
          const currentUserData = await response.json();
          setCurrentUser(currentUserData); 
        } else {
          setError('User not found. Please check the spelling.');
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('An error occurred while fetching the user profile.');
      }
    };

    fetchCurrentUser(); // Call the function when the component mounts
  }, []);

  return (
    <>
      <Header activeItem={"profile"} username={currentUser?.user?.username} />
      <div className='Profile'>
        {error ? (
          <h1>{error}</h1>
        ) : (
          userProfile ? (
            <ProfileComponent user={userProfile} currentUser={currentUser}/>
          ) : (
            <h1>Loading...</h1>
          )
        )}
      </div>
    </>
  );
}
