import React from 'react';
import "./Profile.scss"
import "../FriendsList/index.js"
import SquadList from '../SquadList/index.js'
import FriendsList from '../FriendsList/index.js';
import Button from '../Button';

export default function ProfileComponent({user}) {
    const { name, username, profileBackgroundPic, profilePic, followers, following, description} = user;



    return(
        <div>
            <div className='Profile__container__wrapper'>
                <div className='Profile__container'>
                    <div className='Profile'>
                        <div className='Profile__image__background'>
                        <img className='Profile__img__background' src={profileBackgroundPic} alt="profile" />
                        </div>      
                        
                        <div className='Profile__image'>
                            <div className='Follow__wrapper'>
                                <p className='Follow'>{followers}</p>
                                <p className='Follow__name'>Followers</p>
                            </div>
                                <img className='Profile__img' src={profilePic} alt="profile" />
                            <div className='Follow__wrapper'>
                                <p className='Follow'>{following}</p>
                                <p className='Follow__name'>Following</p>
                            </div>
                        </div>
                            
                        <div className='Profile__name__wrapper'>
                            <h2 className='Profile__name'>{name}</h2>
                            <h1 className='Profile__username'>{username}</h1>
                        </div>

                        <div className='Description'>
                            <p>{description}</p>
                        </div>
                        <Button variant={name === "John Smith" ? "primary" : "outline"} large={false} label={name === "John Smith" ? "Edit Profile" : "Add Friend"} type='submit' fontSize='large' fullWidth={false}/>
                    </div>
                    <div className='SquadList'>
                    <SquadList />
                    </div>
                    <div className='FriendsList'>
                    <FriendsList />
                    </div>
                    
                    
                </div>
            </div>
            
            
        </div>
    )
}