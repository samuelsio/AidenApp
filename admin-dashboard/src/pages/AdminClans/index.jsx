import React from "react";
import "./AdminClans.scss"
import Sidebar from "../../components/sidebar";
import PageHeader from "../../components/PageHeader";

export default function AdminClans(){

    return(
        <div className="AdminClans">
            <div className="container-fluid bg-primary text-white">
                <div className="row">
                    {/* Sidebar */}
                    <Sidebar activeItem={"Manage Clans"}/>

                    <div className="col-md-10 bg-primary">
                        <PageHeader PageName={"Manage Clans"}
                        AdminName={"Aiden"}
                        AdminPFP={"https://placeholder.com/50"} />

                        {/* Body */}
                        <></>
                    </div>
                </div>
            </div>
        </div>
    )
}