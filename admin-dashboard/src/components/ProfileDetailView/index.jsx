import React, { useState } from "react";
import "./ProfileDetailView.scss";
import { Link } from "react-router-dom";

export default function ProfileDetailView({userProfile}){
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        ...userProfile.userProfile,
        clans: userProfile.clans || [],
        events: userProfile.events || [],
        eventComments: userProfile.eventComments || [],
        bulletins: userProfile.bulletins || []});
    const [errorList, setErrorList] = useState([])
    console.log("userProfile: ----------------- ", userProfile)
    const handleEditClick = async() =>{
        if (isEditing){
            console.log("sent to server: ", editedProfile)
            try {
                const token = localStorage.getItem('token');
                const patchUserDetails = await fetch(`http://localhost:3011/users/users/${editedProfile.user_id}`, {
                  method: 'PATCH',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(editedProfile)
                });
                const result = await patchUserDetails.json();
                console.log("Server response: ", result);
              } catch (err) {
                console.error('Error fetching user profile:', err);
                setEditedProfile(userProfile);
                setErrorList([err.message]);        
        }}
        setIsEditing(!isEditing);
    };

    const handleCancel = () =>{
        if (isEditing){
            setEditedProfile(userProfile)
            setIsEditing(false)
            console.log("cancel send: ", isEditing, editedProfile)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile({ ...editedProfile, [name]:value });
    };
    console.log(isEditing)
    console.log({editedProfile})

    return(
        <div className="row d-flex justify-content-evenly bg-secondary h-auto rounded-top">
            <div className="col-md-3 bg-gradient card m-2 p-2 bg-transparent d-flex align-items-center text-white" style={{height: "700px"}}>
                <div className="card w-100 d-flex position-relative align-items-center bg-transparent mb-5 p-2">
                    <img src={editedProfile.profileBackgroundPic || "https://placeholder.com/300"} alt="ProfileBackPic" className="rounded w-100" style={{ aspectRatio: "33/14"}}/>
                    <img src={editedProfile.profilePic || "https://placeholder.com/300"} alt="PFP" className="rounded-circle position-absolute top-100 start-50 translate-middle" style={{ height:"100px", width:"100px"}}/>
                </div>
                <div className="d-flex flex-column flex-fill text-center p-3">
                    <p className="text-white-50 mt-1 m-0">First Name</p>
                    {isEditing ? (
                        <input type="text" name="first_name" value={editedProfile.first_name} onChange={handleInputChange} />
                    ) : (
                        <h3>{editedProfile.first_name}</h3>)}

                    <p className="text-white-50 mt-1 m-0">Last Name</p>
                    {isEditing ? (
                        <input type="text" name="last_name" value={editedProfile.last_name} onChange={handleInputChange} />
                    ) : (
                        <h3>{editedProfile.last_name}</h3>)}

                    <p className="text-white-50 mt-3 m-0">Display Name</p>
                    {isEditing ? (
                        <input type="text" name="displayname" value={editedProfile.displayname} onChange={handleInputChange} />
                    ) : (
                        <h3>{editedProfile.displayname}</h3>)}

                    <p className="text-white-50 mt-1 m-0">username</p>
                    {isEditing ? (
                        <input type="text" name="username" value={editedProfile.username} onChange={handleInputChange} />
                    ) : (
                        <p>{editedProfile.username}</p>
                    )}

                    <p>{editedProfile.email}</p>
                    <p>{editedProfile.description}</p>
                </div>
                <button type="button" onClick={handleEditClick} className={`btn btn-outline-${isEditing ? "success" : "danger"} btn-lg w-75`}>
                {isEditing ? "Save" : "Edit"}
                </button>
                {isEditing && (
                <button type="button" onClick={handleCancel} className={`btn btn-outline-danger btn-lg w-75 mt-1`}>cancel</button>)}
                {errorList.length > 0 && errorList.map((error, index) => (
                <p key={index}>{error}</p> ))}
            </div>
            <div className="col-md-4 card bg-transparent bg-gradient m-2 p-2 overflow-auto text-white" style={{height: "700px"}}>
                {editedProfile.clans.map((userAction) =>(
                    <div key={userAction.id} className="d-flex flex-column justify-content-center bg-transparent card text-white rounded p-1 mt-1">
                        <div className="d-flex flex-row align-items-center justify-content-center bd-highlight mb-3 p-1 border rounded">
                            <div className="flex-fill ps-2">
                                <h3>{userAction.clan_name}</h3>
                                <p>{userAction.description}</p>
                            </div>
                            <div className="row text-center text-white-50">
                                <p>{userAction.creation_date}</p>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center flex-fill p-1">
                            {userAction.description && (
                                    <button type="button" value="edit" label="edit"  className="btn btn-outline-danger btn-lg w-75">Edit</button>
                                )}
                            {userAction.clan_name && (
                                <Link className="w-100 h-100 d-flex text-decoration-none align-items-center justify-content-center"  to={`/AdminClans/${userAction.clan_name}`}>
                                <button type="button" value="edit" label="edit"  className="btn btn-outline-danger btn-lg w-75">View Clan</button>
                            </Link>
                            )}
                            </div>
                            
                        </div>
                        
                </div>
                ))}
            </div>
            <div className="col-md-4 card bg-transparent bg-gradient m-2 p-2 overflow-auto text-white" style={{height: "700px"}}>
                {editedProfile.bulletins && editedProfile.bulletins.length > 0 && (
                    <div className="card bg-transparent text-white text-center">
                        <h3>Bulletin Board</h3>
                        {editedProfile.bulletins.map((bulletin) => (
                        <div key={bulletin.post_id} className="d-flex flex-row align-items-center justify-content-center bd-highlight mt-2 border rounded">
                            <div className="w-50 ps-2">
                                <p>{bulletin.content}</p>
                            </div>
                            <div className="row w-25 text-center text-white-50 p-2">
                                <p>{bulletin.creation_date}</p>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center w-50 p-1">
                                {bulletin.content && (
                                    <button type="button" value="delete" label="delete" className="btn btn-outline-danger btn-lg w-75">Delete</button>
                                )}
                            </div>
                        </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="col-md-4 card bg-transparent bg-gradient m-2 p-2 overflow-auto text-white" style={{height: "130px"}}>

                {editedProfile.events.map((events) => (
                    <div key={events.event_id} className="d-flex flex-row align-items-center justify-content-center bd-highlight mt-2 border rounded">
                        <div className="w-50 ps-2">
                            <p>{events.description}</p>
                        </div>
                        <div className="row w-25 text-center text-white-50 p-2">
                            <p>{events.event_date}</p>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center w-50 p-1">
                            <button type="button" value="delete" label="delete" className="btn btn-outline-danger btn-lg w-75">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-md-4 card bg-transparent bg-gradient m-2 p-2 overflow-auto text-white" style={{height: "130px"}}>
                {editedProfile.eventComments.map((comments) => (
                    <div key={comments.comments_id} className="d-flex flex-row align-items-center justify-content-center bd-highlight mt-2 border rounded">
                        <div className="w-50 ps-2">
                            <p>{comments.content}</p>
                        </div>
                        <div className="row w-25 text-center text-white-50 p-2">
                            <p>{comments.creation_date}</p>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center w-50 p-1">
                            <button type="button" value="delete" label="delete" className="btn btn-outline-danger btn-lg w-75">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}