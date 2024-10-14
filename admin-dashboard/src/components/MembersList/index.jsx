import { useState, useEffect } from "react";
import "./MembersList.scss";

export default function MembersList(){
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [statusFilter, setStatusFilter] = useState("Status Filter");
    const [filteredMembers, setFilteredMembers] = useState([]); // Start with an empty array
    const [allUsers, setAllUsers] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchAllUsers(){
            try {
                const token = localStorage.getItem('token');

                const tokenResponse = await fetch(`http://localhost:3011/users/verifyAdmin`,{
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}`},
                });
                if (tokenResponse.ok) {
                    const getUsers = await fetch(`http://localhost:3011/users/`, {
                        method: 'GET',
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    
                    if (getUsers.ok) {
                        const allUsers = await getUsers.json();
                        setAllUsers(allUsers);
                        setFilteredMembers(allUsers); // Set the initial filtered list to all users
                    } else {
                        setError('No users found');
                    }
                } else {
                    setError('Error verifying admin');
                }
            } catch (err) {
                console.error('Error fetching:', err);
                setError('An error occurred while fetching the user profile.');
            }
        };
            
        fetchAllUsers(); // Call the function when the component mounts
    }, []);

    const sortTable = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
          direction = "desc";
        }
    
        const sortedMembers = [...filteredMembers].sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];
        
            // Handling sorting by 'created' date
            if (key === "created") {
                const dateA = new Date(aValue);
                const dateB = new Date(bValue);
                return direction === "asc" ? dateA - dateB : dateB - dateA;
            }
    
            // For username, handle the numeric parts properly (Username10 appears after Username2 because 10 is > 2)
            if (key === "username" || key === "displayName") {
                const numA = aValue.match(/\d+/g);
                const numB = bValue.match(/\d+/g);

                // If both usernames are numbers, compare them as numbers
                if (numA && numB) {
                    const numericA = parseInt(numA[0]);
                    const numericB = parseInt(numB[0]);
                    return direction === "asc" ? numericA - numericB : numericB - numericA;
                }
            }

            //General sorting logic for other fields
            if (aValue < bValue) return direction === "asc" ? -1 : 1;
            if (aValue > bValue) return direction === "asc" ? 1 : -1;
            return 0;
        });
        
        setFilteredMembers(sortedMembers);
        setSortConfig({ key, direction });
        setSelectedFilter(key); // Used to color the currently selected filter
    };    

    const handleStatusFilter = (event) => {
        const status = event.target.value;
        setStatusFilter(status);
        if (status === "Status Filter" || status === "") {
            setFilteredMembers(allUsers);
        } else {
            setFilteredMembers(allUsers.filter(member => member.status === status));
        }
    };

    const handleRowClick = (username) => {
        window.location.href = `/MembersDashboard/${username}`; 
    };

    useEffect(() => {
        const defaultSort = () => {
            sortTable('id');
        };
        defaultSort();
    }, [allUsers]);

    return(
        <>
        <div className="row mt-4">
            <div className="col-md-8">
                <div className="card bg-secondary text-white p-2">
                    <div className="MembersList d-flex w-100 align-items-center justify-content-evenly">
                        <p className={`card text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'id' ? 'selected' : ''}`} onClick={() => sortTable('id')}>ID</p>
                        <p className={`card text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'username' ? 'selected' : ''}`} onClick={() => sortTable('username')}>Username</p>
                        <p className={`card text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'displayName' ? 'selected' : ''}`} onClick={() => sortTable("displayName")}>Display Name</p>
                        <p className={`card text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'created' ? 'selected' : ''}`} onClick={() => sortTable('created')}>Date Created</p>
                        <select className="card text-white bg-primary p-3 m-0 rounded w-25" onChange={handleStatusFilter} value={statusFilter}>
                            <option>Status Filter</option>
                            <option>Active</option>
                            <option>Needs Attention</option>
                            <option>Suspended</option>
                            <option>Banned</option>
                        </select>
                    </div>
                </div>
            </div>  
        </div>
        <div className="row mt-2">
            <div className="col-md-12">
                <div className="card bg-secondary text-white p-2 table-responsive">
                    <table className="table table-primary table-hover">
                        <thead className="table-secondary">
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Display Name</th>
                                <th>Created (mm/dd/yyyy)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {filteredMembers.map((member) => (
                                <tr onClick={() => handleRowClick(member.username)} style={{ cursor: "pointer" }} key={member.id}>
                                    <td>{member.id}</td>
                                    <td>{member.username}</td>
                                    <td>{member.displayName}</td>
                                    <td>{member.created}</td>
                                    <td>
                                    <span className={`badge bg-${member.status === "active" ? "success" : member.status === "banned" ? "danger" : member.status === "Needs Attention" ? "danger" : "warning"}`}>
                                        {member.status}
                                    </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}
