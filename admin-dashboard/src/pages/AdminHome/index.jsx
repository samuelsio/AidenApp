import React from "react";
import "./AdminHome.scss"
import Sidebar from "../../components/sidebar";
import PageHeader from "../../components/PageHeader";

export default function AdminHome(){

    return(
        <div className="AdminHome">
            <div className="container-fluid bg-primary text-white">
                <div className="row">
                    {/* Sidebar */}
                    <Sidebar activeItem={"Manage Home"}/>

                    <div className="col-md-10 bg-primary">
                        <PageHeader PageName={"Manage Home"}
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