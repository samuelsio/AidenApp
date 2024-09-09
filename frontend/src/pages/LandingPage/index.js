import React from "react";
import "./LandingPage.scss";
import LandingComponent from "../../components/LandingComponent";
import logo from "../../images/logowhite.png";

export default function LandingPage() {
    return (
        <div className="LandingPage">
            <div className="landingHeader">
                <img className="Logo" src={logo} alt="logo" />
                <h3 className="websiteName">WebsiteName</h3>
            </div>
            <LandingComponent />
        </div>

    );
}
