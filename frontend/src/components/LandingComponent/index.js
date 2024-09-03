import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import GifCarousel from "../GifCarousel";
import ProfileGif from "../../images/Profile.gif";
import BulletinGif from "../../images/BulletinBoard.gif";
import ClansGif from "../../images/Clans.gif";
import StreamersGif from "../../images/Streamers.gif";
import "./LandingComponent.scss"
import ProfilePageImg from "../../images/ProfilePageImg.png"
import ClansPageImg from "../../images/ClansPageImg.png"
import SquadImg from "../../images/SquadImg.png"
import GamesPageImg from "../../images/GamesPageImg.png"
import LandingContent from "../LandingContent";

export default function LandingComponent(){
    const navigate = useNavigate(); // Add this line
    const [email, setEmail] = useState("");

    const gifs = [
        ProfileGif,
        BulletinGif,
        ClansGif,
        StreamersGif
    ];


    const handleCreateAccountClick = () => {
        navigate("/register", { state: { email } }); 
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    


    return(
        <div className="LandingComponent">
            <div className="LandingComponent__header">
                <div className="LandingComponent__signUpWrapper">
                    <div className="LandingComponent__signUp">
                        <h1 className="LandingComponent__title">Unlike any social platform you’ve seen before, promoting fresh streamers, showcasing upcoming games, and promoting new friends</h1>
                        <div className="LandingComponent__signUpInput">
                            <p className="LandingComponent__text">Your Email</p>
                            <input className='form-input' type="text" name='email' id='email' placeholder='Email' value={email} onChange={handleEmailChange} />
                            <div className="LandingComponent__SignUp">
                                <Button variant="primary" fullWidth="fullWidth" large="large" label="CREATE ACCOUNT" onClick={handleCreateAccountClick}/>
                            </div>
                            </div>
                        <p className="LandingComponent__text">---- Or ----</p>
                        <div className="LandingComponent__LogIn">
                            <Link className="Link" to="/login">
                                <Button variant="secondary" fullWidth="fullWidth" large="large" label="LOG IN" />
                            </Link>
                        </div>
                    </div>
                    <div className="LandingComponent__ToS">
                        <p className="LandingComponent__text__ToS">By signing up you waive your rights to anything<br />All your bases are belong to us</p>
                    </div>
                </div>
                <div className="LandingComponent__preview">
                    <div className="LandingComponent__carousel">     
                        <GifCarousel 
                        gifs={gifs}/>
                    </div>
                    
                </div>
                
            </div>
            <div className="ContentDecoration">
                <div className="LandingContentContainer">
                    <LandingContent ContentImg={GamesPageImg}
                    ContentHeader="Stay up to date on your favourite game devs"
                    ContentParagraph="From Live Streams, to Tweets, we have it all in one place, explore new games from whats popular to the hidden gems!" />
                    
                    <div className="LandingContentContainer">
                        <LandingContent ContentImg={SquadImg} 
                        ContentHeader="Bored of blaming the blueberries on your team? Search for a squad!"
                        ContentParagraph="At least then you have real people to be annoyed at"/>

                        <div className="LandingContentContainer">
                            <LandingContent ContentImg={ClansPageImg} 
                            ContentHeader="Search for clans and join in on events, meeting new people like you"
                            ContentParagraph="Browse through our user created clans, view their specific games or filter to match, write posts on the live update bulletin board and add new friends"/>

                            <div className="LandingContentContainer">
                                <LandingContent ContentImg={ProfilePageImg} 
                                ContentHeader="Create your profile and invite your friends to gawk at your stats"
                                ContentParagraph="Fully customizable profile, display your Clan Tag with pride, change your profile picture to what describes you best and show off those Follower stats"/>

                            
                            </div>
                        </div>
                    </div>
                </div>     
            </div>
            <div className="LandingComponent__footer">
            <p className="LandingComponent__text">What are you waiting for, join the Collective now...<br/>They are waiting for you</p>
                <div className="LandingComponent__callToAction">
                    <div className="LandingComponent__ctaBtn">
                        <a className="Link" href="#email">
                            <Button variant="primary" fullWidth="fullWidth" large="large" label="CREATE ACCOUNT"/>
                        </a>
                    </div>
                    <div className="LandingComponent__ctaBtn">
                            <Link className="Link" to="/login">
                                <Button variant="secondary" fullWidth="fullWidth" large="large" label="LOG IN" />
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

