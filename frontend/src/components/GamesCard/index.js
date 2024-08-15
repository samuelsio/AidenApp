import React, {useEffect} from 'react';
import "./GamesCard.scss"
import gamesData from "../../pages/Games/dataGames.json";


export default function GamesCard() {
    useEffect(() => {
        const loadTwitterWidget = (index) => {
            if(index >= gamesData.games.length) return;
            const script = document.createElement('script');
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.charSet = "utf-8";
            document.body.appendChild(script);
            setTimeout(() => loadTwitterWidget(index +1), 1000)
        };
        loadTwitterWidget(0);
        }, []);

        return(
        gamesData.games.map((game) => (
            <div className='GamesCard__container' key={game.id}>
                <div className='GamesCard'>
                    <div className='GamesCard__name'>
                    <h1 className='GamesCard__name__header'>{game.name}</h1>
                        {Object.entries(game.store).map(([storeName, storeUrl]) => (
                            <div className='GamesCard__store' key={storeName}>
                                <a className='GamesCard__store__link' href={storeUrl} target="_blank" rel="noopener noreferrer">{storeName}</a>
                            </div>
                        ))}
                    </div>
                    <div className='GamesCard__content'> 

                        <div className='GamesCard__poster__container'>
                            <div className='GamesCard__image'>
                                <img src={game.img_url} alt={game.name} />
                            </div>
                            <div className='GamesCard__description'>
                                <p className='GamesCard__description__text'>{game.description}</p>
                            </div>
                        </div>
                        
                        <div className='GamesCard__twitter_handle'>
                            <a className="twitter-timeline" data-width="400" data-height="256" data-theme="dark" href={`https://twitter.com/${game.twitter_handle}?ref_src=twsrc%5Etfw`}>Tweets by helldivers2</a>
                        </div>
                        <div className='GamesCard__twitch_handle'>
                            {console.log(game.twitch_handle)}
                            <iframe src={`https://player.twitch.tv/?channel=${game.twitch_handle}&parent=${window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname}`} height="300" width="400"></iframe>
                        </div>
                        {/* <div className='GamesCard__thumbnail'>
                            <img src={game.thumbnail} alt={game.name} />
                        </div> */}
                        <div className='GamesCard__store_wrapper'>
                            
                        </div>
                    </div>




                

                </div>
            </div>
        ))
    )
}