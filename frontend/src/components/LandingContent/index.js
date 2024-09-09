import React from "react";
import "./LandingContent.scss"

export default function LandingContent({ContentImg, ContentHeader, ContentParagraph}){

    return(
        <div className="LandingContent">
            <img className="LandingContentImg" src={ContentImg} alt="MissingImg" />
            <div className="ContentText">
                <h1 className="ContentHeader">{ContentHeader}</h1>
                <p className="ContentParagraph">{ContentParagraph}</p>
            </div>
        </div>
    )
}