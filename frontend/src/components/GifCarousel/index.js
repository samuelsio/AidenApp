import React, { useState, useEffect} from "react";
import Indicators from "../Indicators";
import "./GifCarousel.scss"

export default function GifCarousel({gifs}){
    const [currentGifIndex, setCurrentGifIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => { //updates current gif index
            setCurrentGifIndex((prevIndex) => (prevIndex + 1) % gifs.length); //increases the prevIndex by 1, and uses % to reset to 0 once finished
        }, 4000); //duration in ms

        return () => clearInterval(interval); //clears interval and resets
    }, [gifs.length]); // Empty array means this effect runs only once apon mount
    //gufs.length will never change, as such the effect remains the same, using gifs.length to avoid the warning
    return (
        <div className="GifCarousel">
            <img className="gifCarouselImg" src={gifs[currentGifIndex]} alt="gifCarousel" /> {/*Renders the gif*/}
            <Indicators currentIndex={currentGifIndex} total={gifs.length} />
        </div>
    );
}