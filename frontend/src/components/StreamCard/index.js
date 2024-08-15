import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import "./Streamers.scss"
import viewerCountIcon from "../../images/ViewsIcon.png"
export default function StreamCard() {

    const streamer = {
        thumbnail: "https://via.placeholder.com/264x149",
        name: "Streamer",
        description: "Streamer description this can be a mildly long description of the streamer and a couple extra bullet points wasdw wasd rg asd wsdasd wasd awasd dwasd wasd wasd wasd wasd wasd wasd Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        game: "gameName",
        viewerCount: 1213
    }

    return(
        <div className='streamCard__container'>
            <div className='streamCard'>
                <div className='streamCard__gameName'>
                    <h1 className='gameName__Header'>{streamer.game}</h1>
                </div>

                <div className='streamer__container__wrapper'>
                    <div className='streamer__container'>
                        <div className='streamer__image__container'>
                            <img className='streamer__image' src={streamer.thumbnail} alt={streamer.name} />
                        </div>
                        <div className='streamer__info'>
                            <div className='streamer__viewerCount'>
                                <img className='viewerCount__icon' src={viewerCountIcon} alt='viewerCountIcon' />
                                <p className='viewerCount__text'>{streamer.viewerCount}</p>
                            </div>
                            <h1 className='streamer__name'>{streamer.name}</h1>
                            <p className='streamer__description'>{streamer.description}</p>
                        </div>
                    </div>

                    
                    

                </div>
            </div>
        </div>
    )
}