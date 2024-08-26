import React from "react";
import "./SocialCard.scss";
import Button from "../Button";

export default function SocialCard({displayName, username, clanName, clanImg, reputation, background, pfp}) {

    



    return(
        <div className="SocialCard">
            <div className="SocialCard__background">
                <img src={background} alt="background" width="340px" height="80px"/>
            </div>
            <div className="SocialCard__container">
                <div className="SocialCard__pfp">
                    <img src={pfp} alt="profile Pic" height="125px" width="125px" />
                </div>
                <div className="SocialCard__infoWrapper">
                    <div className="SocialCard__userInfo">
                        <h1 className="displayName">{displayName}</h1>
                        <p className="username">{username}</p>
                        <div className="Clan">
                            <img src={clanImg} alt="Clan" width="25px" height="25px" />
                            <p className="ClanName">{clanName}</p>
                        </div>
                    </div>
                    <div className="AddFriend">
                        <div className="Rep">
                            <p className="Reputation">Followers: </p>
                            <p className="RepVal">{reputation}</p>
                        </div>
                        <Button variant="outline" label="Add Friend" type="button" small="small"/>
                    </div>
                </div>

            </div>            
        </div>
    )
}