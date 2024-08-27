import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import "./SocialList.scss"
import SocialCard from "../SocialCard/index";
import filter from "../../images/filter.png"
import socialData from "../../pages/Social/SocialData.json"

export default function SocialList() {
    const [isVisible, setIsVisible] = useState(false);

    const handleImageClick = () => {
        setIsVisible(!isVisible)
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log("Current search term:", e.target.value);
    };

    const filteredUsers = socialData.users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    return(
        <div className='SocialList'>
            <div className='SocialList__wrapper'>
                <div className='SocialList__search'>
                    <input className='form-input' type='text' name='SocialSearch' id='SocialSearch' placeholder='Serach for a profile' value={searchTerm} onChange={handleSearchChange}></input>
                    <div className='SocialList__filter'>
                        <img className='filter' src={filter} alt='filter' width='25px' height='25px' onClick={handleImageClick}/>
                        <div className={`filter-text ${isVisible ? '' : 'visible'}`}> 
                            <div className='filter-mutual'>
                                <p>Filter By: </p>
                                <label> Mutual Friends
                                    <input type='checkbox' label='Filter' placeholder='Filter' />
                                </label>
                                <label> Mutual Clans
                                    <input type='checkbox' label='Filter' placeholder='Filter' />
                                </label>
                                <label> Mutual Games
                                    <input type='checkbox' label='Filter' placeholder='Filter' />
                                </label>
                            </div>
                            <div className='filter-rep'>
                                <p>Order By: </p>
                                <label> Followers
                                    <input type='checkbox' label='Filter' placeholder='Filter' />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='SocialCard__list'>
                {filteredUsers.map(users =>(
                <SocialCard 
                    key={users.username}
                    displayName={users.displayName}
                    username={users.username}
                    clanName={users.clanName}
                    clanImg={users.clanImg}
                    reputation={users.reputation}
                    background={users.background}
                    pfp={users.pfp}
                /> 
                ))}
             </div>
        </div>
        
    )
}
