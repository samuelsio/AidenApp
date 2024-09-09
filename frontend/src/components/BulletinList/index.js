import React from "react";
import BulletinCard from "../BulletinCard";
import Button from "../Button";
import "./BulletinList.scss"

export default function BulletinList({ClanBulletin}) {
    const user = {
        "UserProfilePic": "https://placeholder.com/50",
        "Username": "@Username",
        "DisplayName": "DisplayName"

    }

    return(
        <div className="BulletinList">
            <div className="BulletinList__wrapper">
                <div className="BulletinList__header">
                    <h1 className="BulletinList__title">Bulletin Board</h1>
                </div>
                <div className="BulletinList__userInput">
                    <div className="BulletinList__userProfile">
                        <img className="UserProfilePic" src={user.UserProfilePic} alt="UserPFP" width="50px" height="50px" />
                        <div className="UserProfileName">
                            <p className="Username">{user.Username}</p>
                            <p className="DisplayName">{user.DisplayName}</p>
                        </div>
                    </div>
                    <div className="BulletinList__post">
                        <input className="BulletinList__inputField" type="text" placeholder="Tell us your stories"></input>
                        <div className="BulletinList__btnWrapper">
                            <Button variant="outline" fullWidth="fullwidth" label="Post"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="BulletinList__card">
                
                {ClanBulletin.map((clanMessage, index) => (
                    <div className="BulletinList__message" key={index}>
                        
                        <BulletinCard
                        
                        Comment={clanMessage.Comment}
                        Date={clanMessage.Date}
                        DisplayName={clanMessage.DisplayName}
                        Username={clanMessage.Username}
                        UserProfilePic={clanMessage.UserProfilePic}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}