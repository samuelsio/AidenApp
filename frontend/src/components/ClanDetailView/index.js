import React from "react";
import Button from "../Button";
import "./ClanDetailView.scss"
import EventList from "../EventList";
import ClanMembers from "../ClanMembers";
import BulletinList from "../BulletinList";

export default function ClanDetailView({clan}){

    return(
        <div className="ClanDetailView">
            <div className="ClanDetailView__header">
                <div className="ClanDetailView__background">
                    <img src={clan.ClanBackground} alt="BackgroundImage" width="1600px" height="240px"/>
                </div>
                <div className="ClanDetailView__headerContainer">
                    <div className="ClanDetailView__clanDetail">
                        <div className="ClanDetailView__detailWrapper">
                            <img src={clan.ClanImage} alt="ClanPic"/>
                            <div className="ClanDetailView__clanDesc">
                                <h1 className="ClanDetailView__clanName">{clan.ClanName}</h1>
                                <h2 className="ClanDetailView__clanTag">[{clan.ClanTag}]</h2>
                                <p className="ClanDetailView__clanHeader">{clan.ClanHeader}</p>
                            </div>
                        </div>
                        <div className="ClanDetailView__members">
                            <p>{clan.Members.length} members</p>
                            <Button variant="outline" fullWidth="fullWidth" label="Join Group" />
                        </div>
                    </div>
                    <div className="ClanDetailView__games">
                            <h1 className="ClanDetailView__GameHead">Group Games</h1>
                            {clan.ClanGames.map(games => (
                                <div key={games} className="ClanDetailView__gameItem">
                                    <p>{games}</p>
                                </div>
                            ))}              
                    </div>
                </div>
            </div>
            <div className="ClanDetailView__events">
                
                <EventList
                ClanEvents={clan.ClanEvents}
                />
            </div>
            <div className="ClanDetailView__lowerbody">
                <div className="ClanDetailView__members">
                    <ClanMembers 
                    Members={clan.Members}
                    Friends={clan.Friends}
                    />
                </div>
                <div className="ClanDetailView__bulletin">
                    <BulletinList 
                    ClanBulletin={clan.ClanBulletin}
                    />
                </div>
            </div>
        </div>
    );
}