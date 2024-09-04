import React from "react";
import "./BulletinCard.scss"

export default function BulletinCard({Comment, Date, DisplayName, Username, UserProfilePic}) {

    return(
        <div className="BulletinCard">
            <div className="BulletinCard__profile">
                <img className="UserProfilePic" src={UserProfilePic} alt="PFP" width="50px" height="50px" />
                <div className="BulletinCard__user">
                    <p className="Username">{Username}</p>
                    <p className="DisplayName">{DisplayName}</p>
                </div>
            </div>
            <div className="BulletinCard__commentWrapper">
                <p className="BulletinCard__comment">{Comment}</p>
                <p className="BulletinCard__date">{Date}</p>
            </div>
        </div>
    )
}