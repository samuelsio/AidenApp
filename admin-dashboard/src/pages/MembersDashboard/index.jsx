import React from "react";
import "./MembersDashboard.scss"
import Sidebar from "../../components/sidebar";
import PageHeader from "../../components/PageHeader";
import MembersList from "../../components/MembersList";

export default function MembersDashboard(){

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
    )
}