import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../images/logowhite.png";

export default function Header({activeItem, username}) {
    return (
        <header className="header">
            <div className="container">
                <img src={logo} className="logo" alt="AidenApp logo" />
                <nav className="navbar">
                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <Link to="/" className={`navbar-link ${activeItem === "home" ? "active":""}`}>
                                Home
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/login" className={`navbar-link ${activeItem === "loginPage" ? "active":""}`}>
                                login
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/social" className={`navbar-link ${activeItem === "social" ? "active":""}`}>
                                Social
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to={`/profile/${username}`} className={`navbar-link ${activeItem === "profile" ? "active":""}`}>
                                Profile
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/streamers" className={`navbar-link ${activeItem === "streamers" ? "active":""}`}>
                                Streamers
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/games" className={`navbar-link ${activeItem === "games" ? "active":""}`}>
                                Games
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/clans" className={`navbar-link ${activeItem === "clans" ? "active":""}`}>
                                Clans
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
