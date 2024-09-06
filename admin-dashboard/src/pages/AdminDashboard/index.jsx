import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.scss'; // For any custom CSS needed
import Sidebar from '../../components/sidebar';
import PageHeader from '../../components/PageHeader';
import DashboardComponent from '../../components/DashboardComponent';

export default function AdminDashboard() {
  return (
    <>
    
    <div className="container-fluid bg-primary text-white">
      <div className="row">
        {/* Sidebar */}
        <Sidebar activeItem={"Dashboard"}/>

        {/* Header */}
        <div className="col-md-10 bg-primary">
            <PageHeader PageName={"Dashboard"}
            AdminName={"Aiden"}
            AdminPFP={"https://placeholder.com/50"} />

            {/* Body */}
            <DashboardComponent />
          </div>
        </div>
      </div>
    </>
  );
}
//Load the page, page does a fetch request for DashboardComponent
//The DashboardComponent example is:
{/* <DashboardComponent 
            TotalUsers = {12}
            prevUsers = {8}
            TotalClans = {3}
            prevClans = {4}
            PremiumMembers = {0}
            prevMembers = {1}
            ActiveUsers = {2}
            prevActive = {1}
            /> */}

// Inside the DashboardComponent is the graph measuring TotalUsers over the year
// fetch requires TotalUsers Per Month
// Updated code:
{/* <DashboardComponent 
            TotalUsers = {12}
            TotalUserMonth={{
                January: 2,  
                February: 3,  
                March: 4,  
                April: 1,   
                May: 0,  
                June: 2   
            }} // Example data for the last 6 months
            prevUsers = {8}
            TotalClans = {3}
            prevClans = {4}
            PremiumMembers = {0}
            prevMembers = {1}
            ActiveUsers = {2}
            prevActive = {1}
            /> */}
