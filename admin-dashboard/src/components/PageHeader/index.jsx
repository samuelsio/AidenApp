import React from "react";
import "./PageHeader.scss";
import fallBack from "../../images/WhoopsiePoopsie.png"


export default function PageHeader({PageName, AdminName, AdminPFP}){


    return(
        // <div className="col-md-10 bg-primary">
            <div className="container-fluid">
            {/* Top Navbar */}
                <div className="row pt-3">
                    <div className="col d-flex justify-content-between">
                        <h2>{PageName}</h2>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-bell text-white"></i>
                            <img src={AdminPFP} alt="Avatar" className="rounded-circle ms-2" width="40" height="40" 
                            onError={(e) => { e.target.onerror = null; e.target.src={fallBack}}}/>
                            <span className="ms-2"><small>{AdminName}</small></span>
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    )
}

