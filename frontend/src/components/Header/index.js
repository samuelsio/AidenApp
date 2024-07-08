import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../images/logo.svg";

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <img src={logo} className="logo" alt="AidenApp logo" />
                <nav className="navbar">
                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <Link to="/" className="navbar-link">
                                Home
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/link2" className="navbar-link">
                                Link 2
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/link3" className="navbar-link">
                                Link 3
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/link4" className="navbar-link">
                                Link 4
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
