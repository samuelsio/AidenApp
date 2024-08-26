import React from "react";
import Button from "../Button";
import "./SquadCard.scss"

export default function SquadCard({username, profilePicture, BtnLabel}) {

    return(
        <div className="SquadCard__profile">
            <div className="SquadCard__pfp__wrapper">
                <img className="SquadCard__pfp" src={profilePicture} alt="PFP" width="50px" height="50px"/>
            </div>
            <div className="SquadCard__username__wrapper">
                <p className="SquadCard__username">{username}</p>
            </div>
            <div className="SquadCard__button">
            {username === "You" ? null : (
                <Button variant="outline" label={BtnLabel} type="submit" fullWidth="fullWidth"/>
                 )}
            </div>
        </div>
    )
}