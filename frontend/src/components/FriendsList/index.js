import React from "react"
import "./FriendsList.scss"
import FriendsCard from "../FriendsCard/index.js"
import friendsData from "../../pages/Profile/friendsData.json"

export default function FriendsList({style}) {
    return (
        <div className={`FriendsList ${style}`}>
            <h1 className="Friends__Header">Friends</h1>
            <div className={`FriendsList__container ${style}`}>
                {friendsData.friends.map((friends) => (
                <div className="FriendsList__Card" key={friends.username}>
                    <FriendsCard 
                        username={friends.username}
                        status={friends.status}
                        activity={friends.activity}
                        squad={friends.squad}
                        profilePicture={friends.profilePic}
                    />
                </div>
                ))}
                
            </div>
        </div>
    )
}