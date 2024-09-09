import StreamCard from "../StreamCard"
import streamersData from "../../pages/Streamers/streamersData.json"
import "./StreamCardList.scss"

export default function StreamCardList({filter, width}) {


    //default return
    return (
        filter ? (
            streamersData.category.filter(category => category.type === filter).map((streamer) => (
                <div className={`streamCardList__container ${width}`} key={streamer.id}>
                    <div className={`streamCardList ${width}`}>
                        <div className='streamCardList__gameName'> 
                            <h1 className={`gameName__Header ${streamer.type}`}>Featured Streams</h1>
                        </div>
                        <div className='streamCardList__list'>
                            {streamer.streams.map((streamer) => (
                                <StreamCard 
                                key={streamer.id}
                                thumbnail={streamer.thumbnail}
                                name={streamer.name}
                                viewerCount={streamer.viewerCount}
                                description={streamer.description}
                                game={streamer.game}
                                />  
                            ))}
                        </div>
                    </div>
                </div>  
            ))
        ) : (
            streamersData.category.map((streamer) => (
                <div className='streamCardList__container' key={streamer.id}>
                    <div className='streamCardList'>
                        <div className='streamCardList__gameName'> 
                            <h1 className={`gameName__Header ${streamer.type}`}>{streamer.name}</h1>
                        </div>
                        <div className='streamCardList__list'>
                            {streamer.streams.map((streamer) => (
                                <StreamCard 
                                key={streamer.id}
                                thumbnail={streamer.thumbnail}
                                name={streamer.name}
                                viewerCount={streamer.viewerCount}
                                description={streamer.description}
                                game={streamer.game}
                                />  
                            ))}
                        </div>
                    </div>
                </div>  
            ))
        )
    )
}