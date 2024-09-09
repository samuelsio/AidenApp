import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

export default function Sidebar({activeItem}){

    return (
        <div className="col-md-2 card rounded-start-0 bg-secondary text-white sidebar vh-100">
          <div className="text-center py-4">
            <h4>Web<span className="text-primary">Site</span></h4>
          </div>
          <div className="d-flex justify-content-between flex-column " style={{height: "calc(100vh - 85px)"}}>
            <ul className="nav flex-column bg-secondary justify-content-center">
                <li className={`nav-item ${activeItem === "Dashboard" ? "border-start border-primary border-3" : ""}`}>
                <Link to="/AdminDashboard" className={`nav-link text-white  ${activeItem === "Dashboard" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    <i className="bi bi-grid"></i> Dashboard
                </Link>
                </li>
                <li className={`nav-item ${activeItem === "Members" ? "border-start border-primary border-3" : ""}`}>
                <Link to="/MembersDashboard" className={`nav-link text-white  ${activeItem === "Members" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    Manage Members
                </Link>
                </li>
                <li className={`nav-item ${activeItem === "AdminClans" ? "border-start border-primary border-3" : ""}`}>
                <Link to="/AdminClans" className={`nav-link text-white  ${activeItem === "AdminClans" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    Manage Clans
                </Link>
                <Link to="/AdminGames" className={`nav-link text-white  ${activeItem === "AdminGames" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    Manage Games
                </Link>
                <Link to="/AdminHome" className={`nav-link text-white  ${activeItem === "AdminHome" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    Manage Home
                </Link>
                <Link to="/AdminStreamers" className={`nav-link text-white  ${activeItem === "AdminStreamers" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    Manage Streamers
                </Link>
                </li>
                <li className={`nav-item ${activeItem === "Reports" ? "border-start border-primary border-3" : ""}`}>
                <Link to="/Reports" className={`nav-link text-white  ${activeItem === "Reports" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    Reports
                </Link>
                </li>
                <li className={`nav-item ${activeItem === "Tickets" ? "border-start border-primary border-3" : ""}`}>
                <Link to="/Tickets" className={`nav-link text-white  ${activeItem === "Tickets" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    Tickets
                </Link>
                </li>
                <li className={`nav-item ${activeItem === "Inbox" ? "border-start border-primary border-3" : ""}`}>
                <Link to="/Inbox" className={`nav-link text-white  ${activeItem === "Inbox" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    Inbox
                </Link>
                </li>
                
                <li className={`nav-item ${activeItem === "ToDo" ? "border-start border-primary border-3" : ""}`}>
                <Link to="/ToDo" className={`nav-link text-white  ${activeItem === "ToDo" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    To-Do
                </Link>
                </li>
            </ul>
            <ul className="nav flex-column bg-secondary justify-content-center">
                <li className={`nav-item mt-4 ${activeItem === "Settings" ? "border-start border-primary border-3" : ""}`}>
                <Link to="/Settings" className={`nav-link text-white  ${activeItem === "Settings" ? "text-white active rounded m-1 bg-primary" : ""}`}>
                    Settings
                </Link>
                </li>
                <li className={`nav-item pb-3`}>
                <Link to="/" className={`nav-link text-white rounded bg-danger`}>
                    Logout
                </Link>
                </li>
            </ul>
            </div>
        </div>
    
    )
}