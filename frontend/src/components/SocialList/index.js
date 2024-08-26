import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import "./SocialList.scss"
import SocialCard from "../SocialCard/index";
import filter from "../../images/filter.png"

export default function SocialList() {
    const [isVisible, setIsVisible] = useState(false);

    const handleImageClick = () => {
        setIsVisible(!isVisible)
    };

    return(
        <div className='SocialList'>
            <div className='SocialList__wrapper'>
                <div className='SocialList__search'>
                    <input className='form-input' type='text' name='SocialSearch' id='SocialSearch' placeholder='Serach for a profile'></input>
                    <img className='filter' src={filter} alt='filter' width='25px' height='25px' onClick={handleImageClick}/>
                </div>
                <div className='SocialList__filter'>
                        <p className={`filter-text ${isVisible ? 'visible' : ''}`}>Tip tap</p>
                    </div>
            </div>
            <div className='SocialCard__list'>
                <SocialCard 
                displayName = "displayName"
                username = "username"
                clanName = "clan"
                clanImg = "https://placeholder.com/25"
                reputation = "69"
                background = "https://placeholder.com/400"
                pfp = "https:placeholder.com/125"
                
                /> {/* displayName, username, clanName, clanImg, reputation, background, pfp */}
             </div>
        </div>
        
    )
}