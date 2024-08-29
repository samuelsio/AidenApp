import React from "react";
import "./EventCard.scss";
import Button from "../Button";

export default function EventCard({Game, EventMembers, EventTime, EventDesc, EventComments, EventJoin}){

    return(
        <div className="EventCard">
            <div className="EventCard__description">
                <h1>{Game}</h1>
                <p>{EventDesc}</p>
                <p>{EventTime}</p>
                <p>Participating: {EventMembers}</p>
                <div className="EventCard__btnWrapper">
                    <Button variant={EventJoin === "True" ? "revert" : "outline"} label={EventJoin === "True" ? "Leave" : "Join"} />
                </div>
            </div>
            <div className="EventCard__comments">
                {EventComments.map((comments) => (
                    <div className="GameComment" key={comments.Username}>
                        <div className="GameComment__profile">
                            <img className="GameComment__image" src={comments.UserProfilePic} alt="PFP"/>
                            <p className="GameComment__username">{comments.Username}</p>
                        </div>
                        <p className="GameComment__comment">{comments.Comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}