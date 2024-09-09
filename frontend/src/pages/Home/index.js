import React from "react";
import Header from "../../components/Header";
import "./Home.scss";
import DashboardComponent from "../../components/DashboardComponent";

export default function Home() {
    return (
        <div className="home">
            <Header activeItem={"home"}/>
            <div className="Home__dashboard">
                <DashboardComponent />
            </div>
        </div>
    );
}
