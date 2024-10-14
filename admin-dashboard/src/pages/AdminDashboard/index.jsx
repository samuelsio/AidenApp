import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.scss'; // For any custom CSS needed
import Sidebar from '../../components/sidebar';
import PageHeader from '../../components/PageHeader';
import DashboardComponent from '../../components/DashboardComponent';

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(''); // State to store any error messages
  
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
  
        // Fetch the current user's basic data using the token
        const tokenResponse = await fetch(`http://localhost:3011/users/token`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (tokenResponse.ok) {
          const currentUserData = await tokenResponse.json();
          const username = currentUserData.user.username;
          // Now fetch the full user data using the username
          const userResponse = await fetch(`http://localhost:3011/users/profile/${username}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }, 
          });
  
          if (userResponse.ok) {
            const fullUserData = await userResponse.json();
            setCurrentUser(fullUserData); 
          } else {
            setError('Full user data not found.');
          }
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
  
  if (error){
    console.log(error)
  };

  return (
    <>
    
    <div className="container-fluid bg-primary text-white">
      <div className="row">
        {/* Sidebar */}
        <Sidebar activeItem={"Dashboard"}/>

        {/* Header */}
        <div className="col-md-10 bg-primary">
            <PageHeader PageName={"Dashboard"}
            AdminName={currentUser?.username}
            AdminPFP={currentUser?.profilepic || "https://placeholder.com/50"} />

            {/* Body */}
            <DashboardComponent />
          </div>
        </div>
      </div>
    </>
  );
}
