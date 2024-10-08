import React from "react";
import "./SquadList.scss";
import statusEmoji from "../../images/AVG status emoji.png";
import friendsData from "../../pages/Profile/friendsData.json"
import SquadCard from "../SquadCard/index.js"

export default function SquadList(){
    const squadMembers = friendsData.friends.filter(friend => friend.squad === "True");

    return(
    <div className='SquadProfile'>
            <div className='SquadProfile__container'>
                <div className='SquadProfile__user__wrapper'>
                    <div className='SquadProfile__user__pfp'>
                        <img className="SquadProfile__status" src={statusEmoji} alt="User Profile"></img>
                    </div>
                        <div className='SquadProfile__user__status'>
                        <input className='SquadProfile__Activity' type="text" name='username' id='setActivity' placeholder='What are you doing?'/>
                    </div>
                </div>
                <div className='Profile__squad__container'>
                    <h1 className='Squad__name'>Your Squad</h1>
                    <div className="Squad__wrapper">
                        
                        <div className="SquadCard__wrapper">
                            <div className="Squad__container">
                                
                                <SquadCard 
                                username="You"
                                profilePicture="https://placeholder.com/150"
                                />
                            </div>
                            {squadMembers.map((friends) => (
                            <div className='Squad__container' key={friends.username}>
                                <SquadCard 
                                username={friends.username}
                                profilePicture={friends.profilePic}
                                BtnLabel="Kick"
                                />
                            </div>
                            ))}
                            {[...Array(3 - squadMembers.length)].map((_, index) => (
                                <div className='Squad__container' key={index}>
                                    <SquadCard 
                                    username="Search for Squad Members"
                                    profilePicture={"https://placeholder.com/150"} 
                                    BtnLabel="Search"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}