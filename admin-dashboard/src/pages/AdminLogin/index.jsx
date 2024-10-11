import React from "react";
import "./AdminLogin.scss"
import AdminLogginComponent from "../../components/AdminLogginComponent";



export default function AdminStreams(){

    return(
        <div className="AdminStreams">
            <div className="d-flex align-items-center justify-content-center bg-primary text-white vh-100 vw-100">
                <div className="d-inline-flex d-inline-flex h-25 w-25">
                    <AdminLogginComponent />
                </div>
            </div>
        </div>
    )
}