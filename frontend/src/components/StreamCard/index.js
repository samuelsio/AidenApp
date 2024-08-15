import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import "./Streamers.scss"
import viewerCountIcon from "../../images/ViewsIcon.png"


export default function StreamCard({ thumbnail, name, viewerCount, description}) {

    

    return(
    <div className='streamer__container__wrapper'>
        <div className='streamer__container'>
            <div className='streamer__image__container'>
                <img className='streamer__image' src={thumbnail} alt={name} />
            </div>
            <div className='streamer__info'>
                <div className='streamer__viewerCount'>
                    <img className='viewerCount__icon' src={viewerCountIcon} alt='viewerCountIcon' />
                    <p className='viewerCount__text'>{viewerCount}</p>
                </div>
                <h1 className='streamer__name'>{name}</h1>
                <p className='streamer__description'>{description}</p>
            </div>
        </div>
    </div>
    )
}