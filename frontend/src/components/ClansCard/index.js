import React from "react";
import Button from "../Button";
import {Link} from 'react-router-dom'
import "./ClansCard.scss";

export default function ClansCard({ClanName, ClanBackground, ClanImage, Members, ClanTag, ClanHeader}) {

    return(
        <div className="ClansCard">
            <img className="ClansCard__background" src={ClanBackground} alt="Background" width="240px" height="105px"/>
            <div className="ClansCard__container">
                <div className="ClansCard__profile">
                    <img className="ClansCard__image" src={ClanImage} alt="ClanImg" width="100px" height="100px"/>
                    <p className="ClanTag">[{ClanTag}]</p>
                </div>
                <div className="ClansCard__info">
                    <div className="ClansCard__header">
                        <h1 className="ClanName">{ClanName}</h1>
                        <p className="ClanHeader">{ClanHeader}</p>
                    </div>
                    <div className="ClansCard__footer">
                        <p className="Members">Members: {Members.length}</p>
                        <Link to={`/clans/${ClanName}`}>
                            <Button variant="outline" label="View Clan" fullWidth="fullWidth" type="button" small="small" to={`/clans/${ClanName}`}/>
                        </Link>        
                    </div>
                </div>
            </div>
        </div>
    )
}
