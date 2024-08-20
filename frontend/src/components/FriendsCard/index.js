import React from "react";
import "./FriendsCard.scss"
import Button from "../Button";

export default function FriendsCard({username, status, activity, squad, profilePicture}){

// 	FriendsListCard{
// 	username: "aidentopshot"
// 	Status: "Online"
// 	Activity: "Browser Open" or "Playing Stardew Valley"
// 	Squad: "True" or "False"
// 	}

// const username = "aidentopshot";
// const status = "Online";
// const activity = "In Browser";


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
                {squad === "True" ? null : (
                 <Button variant="outline" large={false} label='Invite' type='submit' fontSize='12px' fullWidth={false}/> 
                 )}
            </div>
        </div>
        
    </div>
)}

