import { useState, useEffect } from "react";
import "./MembersList.scss";
import membersData from "../../pages/MembersDashboard/MembersList.json"

export default function MembersList(){
    const members = membersData.members
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [statusFilter, setStatusFilter] = useState("Status Filter")
    const [filteredMembers, setFilteredMembers] = useState(members)

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

        //General sorting logic for ID
        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
        });
        
        
        setFilteredMembers(sortedMembers);
        setSortConfig({ key, direction });
        setSelectedFilter(key); //Used to colour the currently selected filter
      };    

      const handleStatusFilter = (event) => {
        const status = event.target.value
            setStatusFilter(status)
        if (status === "Status Filter" || status === "") {
            setFilteredMembers(members);
        } else {
            setFilteredMembers(members.filter(member => member.status === status))
      }};
      
      const handleRowClick = (username) =>{
        window.location.href = `/MembersDashboard/${username}`; 
      };

      useEffect(() => {
        const defaultSort = () => {
            sortTable('id');
        };
        defaultSort()
    }, []);



    return(
        <>
        <div className="row mt-4">
              <div className="col-md-8">
                <div className="card bg-secondary text-white p-2">
                    <div className="MembersList d-flex w-100 align-items-center justify-content-evenly">
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'id' ? 'selected' : ''}`} onClick={() => sortTable('id')}>ID</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'username' ? 'selected' : ''}`} onClick={() => sortTable('username')}>Username</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'displayName' ? 'selected' : ''}`} onClick={() => sortTable("displayName")}>Display Name</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'created' ? 'selected' : ''}`} onClick={() => sortTable('created')}>Date Created</p>
                        <select className="card  text-white bg-primary p-3 m-0 rounded w-25" onChange={handleStatusFilter} value={statusFilter}>
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
                                    <td >{member.id}</td>
                                    <td >{member.username}</td>
                                    <td>{member.displayName}</td>
                                    <td>{member.created}</td>
                                    <td>
                                    <span className={`badge bg-${member.status === "Active" ? "success" : member.status === "Banned" ? "danger" : member.status === "Needs Attention" ? "danger" : "warning"}`}>
                                        {member.status} {/* Active=bg-green, Banned=bg-red, Needs Attention=bg-red, everything else=bg-orange */}
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