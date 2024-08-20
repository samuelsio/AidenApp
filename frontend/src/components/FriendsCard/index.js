import React from "react";
import "./FriendsCard.scss"
import Button from "../Button";

export default function FriendsCard({username, status, activity, squad, profilePicture}){

return(
    <div className="FriendsCard__wrapper">
        <div className="FriendsCard">
            <div className="FriendsCard__profile__header">
                <img className="FriendsCard__pfp" src={profilePicture} alt="Profile" width="50" height="50" />
                <div className="FriendsCard__header">
                    <p className="FriendsCard__username">{username}</p>
                    <p className="FriendsCard__status">{status}</p>
                </div>
            </div>
            <div className="FriendsCard__Active">
                <p className="FriendsCard__playing">{activity}</p>
                <div className="FriendsCard__button">
                    {squad === "True" ? null : (
                    <Button variant="outline" large={false} label='Invite' type='submit' fontSize='12px' fullWidth="fullWidth"/> 
                    )}
                 </div>
            </div>
        </div>
        
    </div>
)}

