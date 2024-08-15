import StreamCard from "../StreamCard"
import streamersData from "../../pages/Streamers/streamersData.json"
import "./StreamCardList.scss"

export default function StreamCardList() {

    return (
        streamersData.category.map((streamer) => (
        <div className='streamCard__container'>
            <div className='streamCard'>
                <div className='streamCard__gameName' key={streamer.id}> 
                    <h1 className={`gameName__Header ${streamer.type}`}>{streamer.name}</h1>
                </div>
                <div className='streamCard__list'>
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
}