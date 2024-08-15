import React from "react";
import Header from "../../components/Header";
import "./Home.scss";

export default function Home() {
    return (
        <div className="home">
            <Header activeItem={"home"}/>
            <h1>This is the homepage</h1>
            <p>This is a placeholder home page.</p>
            <a
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </div>
    );
}
