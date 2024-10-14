import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./MembersDashboard.scss"
import Sidebar from "../../components/sidebar";
import PageHeader from "../../components/PageHeader";
import MembersList from "../../components/MembersList";
import membersData from "./MembersList.json"
import ProfileDetailView from "../../components/ProfileDetailView";

export default function MembersDashboard(){
    
    const{username: usernameParam} = useParams();
    const userProfile = membersData.members.find(member => member.username === usernameParam);
    
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
    
    if (usernameParam && !userProfile){
        return(
            <>
            <div className="MembersDashboard">
                <div className="container-fluid bg-primary text-white">
                    <div className="row">
                        {/* Sidebar */}
                        <Sidebar activeItem={"Manage Members"}/>
                        <div className="col-md-10 bg-primary">
                            <h1>Error 404: Page Not Found</h1>
                        </div>
                    </div>
                </div>
            </div>      
            </>
        )};
    if (!usernameParam){
        return(
            <div className="MembersDashboard">
                <div className="container-fluid bg-primary text-white">
                    <div className="row">
                        {/* Sidebar */}
                        <Sidebar activeItem={"Manage Members"}/>

                        <div className="col-md-10 bg-primary">
                            <PageHeader PageName={"Manage Members"}
                            AdminName={currentUser?.username}
                            AdminPFP={currentUser?.profilepic || "https://placeholder.com/50"} />

                            {/* Body */}
                            <MembersList />
                        </div>
                    </div>
                </div>
            </div>
        )};

return(
    <div className="MembersDashboard">
        <div className="container-fluid bg-primary text-white">
            <div className="row">
                {/* Sidebar */}
                <Sidebar activeItem={"Manage Members"}/>

                <div className="col-md-10 bg-primary">
                    <PageHeader PageName={"Manage Members"}
                    AdminName={currentUser?.username}
                    AdminPFP={currentUser?.profilepic || "https://placeholder.com/50"} />

                    {/* Body */}
                    <ProfileDetailView 
                    userProfile={userProfile}/>
                </div>
            </div>
        </div>
    </div>
)};