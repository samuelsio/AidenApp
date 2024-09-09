import React from "react";
import Button from "../Button";
import "./EventList.scss"
import EventCard from "../EventCard";

export default function EventList({ClanEvents}){

    return(
        <div className="EventList">
            <div className="EventList__header">
                <h1 className="EventList__title">Events</h1>
                <div className="EventList__btnContainer">
                    <Button variant="outline" fullWidth="fullwidth" label="Create Event" />
                </div>
            </div>
            {console.log(ClanEvents)}
            <div className="EventList__EventCard">
                {ClanEvents.map((event) => (
                    <EventCard 
                        Game={event.Game}
                        EventMembers={event.EventMembers}
                        EventTime={event.EventTime}
                        EventDesc={event.EventDesc}
                        EventComments={event.EventComments}
                        EventJoin={event.EventJoin}
                    />
                ))}
            </div>
        </div>
    )
}
