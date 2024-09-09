import React from "react";
import "./DashboardComponent.scss";
import StreamCardList from "../StreamCardList";
import FriendsList from "../FriendsList"
import GamesCard from "../GamesCard";

export default function DashboardComponent(){

    return(
        <div className="Dashboard">
            <div className="Dashboard__friends">
                <FriendsList 
                style="dashboard"
                />
            </div>
            <div className="Dashboard__container">
                <div className="Dashboard__featuredStreams">
                    <StreamCardList 
                    filter="hottest"
                    width="small"/>
                </div>
                
            </div>
            <GamesCard 
            filter="random"
            />
            
            
        </div>
    )
}