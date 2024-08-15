import React from 'react';
import "./GamesCard.scss"
import gamesData from "../../pages/Games/dataGames.json";


export default function GamesCard() {


    return(
        gamesData.games.map((game) => (
            <div className='GamesCard__container' key={game.id}>
                <div className='GamesCard__name'>
                    <h1 className='GamesCard__name__header'>{game.name}</h1>
                </div>
                <div className='GamesCard__image'>
                    <img src={game.image} alt={game.name} />
                </div>
                <div className='GamesCard__description'>
                    <p className='GamesCard__description__text'>{game.description}</p>
                </div>
                <div className='GamesCard__twitter_handle'>
                    <a className="twitter-timeline" href="https://twitter.com/helldivers2?ref_src=twsrc%5Etfw">Tweets by helldivers2</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </div>
                <div className='GamesCard__thumbnail'>
                    <img src={game.thumbnail} alt={game.name} />
                </div>
                {Object.entries(game.store).map(([storeName, storeUrl]) => (
                    <div className='GamesCard__store' key={storeName}>
                        <a href={storeUrl} target="_blank" rel="noopener noreferrer">{storeName}</a>
                    </div>
                ))}





                


            </div>
        ))
    )
}