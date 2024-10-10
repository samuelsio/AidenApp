import React from 'react';
import "./Profile.scss"
import "../FriendsList/index.js"
import SquadList from '../SquadList/index.js'
import FriendsList from '../FriendsList/index.js';
import Button from '../Button';
import { signOut } from '../../utils/auth.js';

export default function ProfileComponent({user, currentUser}) {
    const displayName = user.displayname, 
    username = user.username, 
    profileBackgroundPic = user.profilebackgroundpic, 
    profilePic = user.profilepic, 
    followers = user.followers, 
    following = user.following, 
    description = user.description

    const currentUsername = currentUser?.user?.username; 

    return(
        <div>
            <div className='Profile__container__wrapper'>
                <div className='Profile__container'>
                    <div className='Profile'>
                        <div className='Profile__image__background'>
                        <img className='Profile__img__background' src={profileBackgroundPic ? profileBackgroundPic : "https://placeholder.com/396x168"} alt="profile" />
                        </div>      
                        
                        <div className='Profile__image'>
                            <div className='Follow__wrapper'>
                                <p className='Follow'>{followers}</p>
                                <p className='Follow__name'>Followers</p>
                            </div>
                                <img className='Profile__img' src={profilePic ? profilePic : "https://placeholder.com/150"} alt="profile" />
                            <div className='Follow__wrapper'>
                                <p className='Follow'>{following}</p>
                                <p className='Follow__name'>Following</p>
                            </div>
                        </div>
                            
                        <div className='Profile__name__wrapper'>
                            <h2 className='Profile__name'>{displayName}</h2>
                            <h1 className='Profile__username'>{username}</h1>
                        </div>

                        <div className='Description'>
                            <p>{description}</p>
                        </div>
                        <Button variant={username === currentUsername ? "revert" : "outline"} large={false} label={username === currentUsername ? "Log Out" : "Add Friend"} type='submit' fontSize='large' fullWidth={false} onClick={username === currentUsername ? signOut : () => {}}/>
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