import React from "react";
import "./AdminGames.scss"
import Sidebar from "../../components/sidebar";
import PageHeader from "../../components/PageHeader";

export default function AdminGames(){

    return(
        <div className="AdminGames">
            <div className="container-fluid bg-primary text-white">
                <div className="row">
                    {/* Sidebar */}
                    <Sidebar activeItem={"Manage Games"}/>

                    <div className="col-md-10 bg-primary">
                        <PageHeader PageName={"Manage Games"}
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