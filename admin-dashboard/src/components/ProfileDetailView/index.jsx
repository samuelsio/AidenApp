import React from "react";
import "./ProfileDetailView.scss";
import { Link } from "react-router-dom";

export default function ProfileDetailView({userProfile}){

    return(
        <div className="row d-flex justify-content-evenly bg-secondary rounded-top " style={{height: "calc(100vh + -62px)"}}>
            <div className="col-md-3 bg-gradient card m-2 p-2 bg-transparent d-flex align-items-center text-white" >
                <div className="card w-100 d-flex position-relative align-items-center bg-transparent mb-5 p-2">
                    <img src={userProfile.profileBackgroundPic} alt="ProfileBackPic" className="w-100 h-100 rounded"/>
                    <img src={userProfile.profilePic} alt="PFP" className="rounded-circle position-absolute top-100 start-50 translate-middle" style={{ height:"100px", width:"100px"}}/>
                </div>
                <div className="d-flex flex-column flex-fill text-center p-3">
                    <p className="text-white-50 mt-1 m-0">name</p>
                    <h3>{userProfile.name}</h3>
                    <p className="text-white-50 mt-3 m-0">Display Name</p>
                    <h3>{userProfile.displayName}</h3>
                    <p className="text-white-50 mt-1 m-0">username</p>
                    <p>{userProfile.username}</p>
                    <p>{userProfile.email}</p>
                    <p>{userProfile.description}</p>
                </div>
                <button type="button" value="edit" label="edit"  className="btn btn-outline-danger btn-lg w-75">Edit</button>
            </div>
            <div className="col-md-8 card bg-transparent bg-gradient m-2 p-2 text-white">
                {userProfile.interactions.map((userAction) =>(
                    <div key={userAction.id} className="d-flex flex-row justify-content-center bd-highlight mb-3 border rounded">
                        <div className="flex-fill p-2">
                            <h3>{userAction.type}</h3>
                            <p>{userAction.text || userAction.group}</p>
                        </div>
                        <div className="row text-center text-white-50">
                            <p>{userAction.time}</p>
                            <p>{userAction.date}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center w-25 p-1">
                        {userAction.text && (
                                <button type="button" value="edit" label="edit"  className="btn btn-outline-danger btn-lg w-75">Edit</button>
                            )}
                        {userAction.group && (
                            <Link className="w-100 h-100 d-flex text-decoration-none align-items-center justify-content-center" to={`/AdminClans/${userAction.group}`}>
                            <button type="button" value="edit" label="edit"  className="btn btn-outline-danger btn-lg w-75">View Clan</button>
                        </Link>
                        )}
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}