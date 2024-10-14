import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import "./Social.scss";
import SocialList from '../../components/SocialList/index';



export default function Social() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(''); // State to store any error messages
  
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
    <Header activeItem={"social"} username={currentUser?.user?.username} />
    <div className='Social'>
        <h1>Social</h1>
    </div>
    <SocialList />
    </>
  )
}