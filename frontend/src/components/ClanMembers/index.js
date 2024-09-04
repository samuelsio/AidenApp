import React from "react";
import "./ClanMembers.scss"

export default function ClanMembers({Members, Friends}){

    return(
        <div className="ClanMembers">
            <div className="ClanMembers__header">
                <h1 className="ClanMembers__title">Members</h1>
            </div>
            <div className="ClanMembers__members">
                <h1 className="Friends__title">Friends</h1>
                <div className="member__container">
                    {Friends.map((friend, index) => (
                        <p key={index} className="member">{friend}</p>
                    ))}
                </div>
            </div>
            <div className="ClanMembers__members">
                <h1 className="Members__title">Members</h1>
                <div className="member__container">
                    {Members.map((member, index) => (
                        <p key={index} className="member">{member}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}