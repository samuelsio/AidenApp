import React from "react";
import { useParams } from 'react-router-dom';
import "./MembersDashboard.scss"
import Sidebar from "../../components/sidebar";
import PageHeader from "../../components/PageHeader";
import MembersList from "../../components/MembersList";
import membersData from "./MembersList.json"
import ProfileDetailView from "../../components/ProfileDetailView";

export default function MembersDashboard(){
    const{username: usernameParam} = useParams();
    const userProfile = membersData.members.find(member => member.username === usernameParam);
    
        if (usernameParam && !userProfile){
            return(
                <>
                <div className="MembersDashboard">
                    <div className="container-fluid bg-primary text-white">
                        <div className="row">
                            {/* Sidebar */}
                            <Sidebar activeItem={"Manage Members"}/>
                            <div className="col-md-10 bg-primary">
                                <h1>Error 404: Page Not Found</h1>
                            </div>
                        </div>
                    </div>
                </div>      
                </>
            )};
        if (!usernameParam){
            return(
                <div className="MembersDashboard">
                    <div className="container-fluid bg-primary text-white">
                        <div className="row">
                            {/* Sidebar */}
                            <Sidebar activeItem={"Manage Members"}/>

                            <div className="col-md-10 bg-primary">
                                <PageHeader PageName={"Manage Members"}
                                AdminName={"Aiden"}
                                AdminPFP={"https://placeholder.com/50"} />

                                {/* Body */}
                                <MembersList />
                            </div>
                        </div>
                    </div>
                </div>
            )};

    return(
        <div className="MembersDashboard">
            <div className="container-fluid bg-primary text-white">
                <div className="row">
                    {/* Sidebar */}
                    <Sidebar activeItem={"Manage Members"}/>

                    <div className="col-md-10 bg-primary">
                        <PageHeader PageName={"Manage Members"}
                        AdminName={"Aiden"}
                        AdminPFP={"https://placeholder.com/50"} />

                        {/* Body */}
                        <ProfileDetailView 
                        userProfile={userProfile}/>
                    </div>
                </div>
            </div>
        </div>
    )};