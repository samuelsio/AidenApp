import React from "react";
import "./Sidebar.scss";

export default function Sidebar(){

    return (
        
        <div className="col-md-2 bg-dark text-white sidebar">
          <div className="text-center py-4">
            <h4>Web<span className="text-primary">Site</span></h4>
          </div>
          <ul className="nav flex-column justify-content-evenly h-100">
            <li className="nav-item">
              <a href="#" className="nav-link text-white active">
                <i className="bi bi-grid"></i> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Members
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Moderation Tools
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Inbox
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Order Lists
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Product Stock
              </a>
            </li>
            <li className="nav-item mt-4">
              <a href="#" className="nav-link text-white">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Calendar
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                To-Do
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Team
              </a>
            </li>
            <li className="nav-item mt-4">
              <a href="#" className="nav-link text-white">
                Settings
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Logout
              </a>
            </li>
          </ul>
        </div>
    
    )
}