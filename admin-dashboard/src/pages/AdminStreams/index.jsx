import React from "react";
import "./AdminStreams.scss"
import Sidebar from "../../components/sidebar";
import PageHeader from "../../components/PageHeader";
import StreamersList from "../../components/StreamersList";

export default function AdminStreams(){

    return(
        <div className="AdminStreams">
            <div className="container-fluid bg-primary text-white">
                <div className="row">
                    {/* Sidebar */}
                    <Sidebar activeItem={"Manage Streams"}/>

                    <div className="col-md-10 bg-primary">
                        <PageHeader PageName={"Manage Streams"}
                        AdminName={"Aiden"}
                        AdminPFP={"https://placeholder.com/50"} />

                        {/* Body */}
                        <StreamersList />
                    </div>
                </div>
            </div>
        </div>
    )
}