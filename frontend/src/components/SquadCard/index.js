import React from "react";
import Button from "../Button";
import "./SquadCard.scss"

export default function SquadCard({username, profilePicture}) {

    return(
        <div className="SquadCard__profile">
            <img className="SquadCard__pfp" src={profilePicture} alt="PFP" width="50px" height="50px"/>
            <p className="SquadCard__username">{username}</p>
            <Button variant="outline" label="Kick" type="submit" />
        </div>
    )
}