import {useState, useEffect} from "react";
import "./ClansList.scss"
import clansData from "../../pages/AdminClans/ClansList.json"

export default function ClansList(){
    const clans = clansData.clans
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [statusFilter, setStatusFilter] = useState("Status Filter")
    const [filteredClans, setFilteredClans] = useState(clans)

    const sortTable = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
          direction = "desc";
        }
    
        const sortedClans = [...filteredClans].sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];
        
        // Handling sorting by 'created' date
        if (key === "created") {
            const dateA = new Date(aValue);
            const dateB = new Date(bValue);
            return direction === "asc" ? dateA - dateB : dateB - dateA;
            
        }
    
            // For username, handle the numeric parts properly (Username10 appears after Username2 because 10 is > 2)
        if (key === "ClanName" || key === "displayName") {
            const numA = aValue.match(/\d+/g);
            const numB = bValue.match(/\d+/g);

            // If both usernames are numbers, compare them as numbers
            if (numA && numB) {
                const numericA = parseInt(numA[0]);
                const numericB = parseInt(numB[0]);
                return direction === "asc" ? numericA - numericB : numericB - numericA;
            }
        }

        //General sorting logic for ID/ownerID
        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
        });
        
        
        setFilteredClans(sortedClans);
        setSortConfig({ key, direction });
        setSelectedFilter(key); //Used to colour the currently selected filter
      };    

      const handleStatusFilter = (event) => {
        const status = event.target.value
            setStatusFilter(status)
        if (status === "Status Filter" || status === "") {
            setFilteredClans(clans);
        } else {
            setFilteredClans(clans.filter(member => member.status === status))
      }}
      
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
                    <div className="ClansList d-flex w-100 align-items-center justify-content-evenly">
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'id' ? 'selected' : ''}`} onClick={() => sortTable('id')}>Clan ID</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'ClanName' ? 'selected' : ''}`} onClick={() => sortTable('ClanName')}>Clan Name</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'ClanTag' ? 'selected' : ''}`} onClick={() => sortTable('ClanTag')}>Clan Tag</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'created' ? 'selected' : ''}`} onClick={() => sortTable('created')}>Date Created</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'ownerID' ? 'selected' : ''}`} onClick={() => sortTable("ownerID")}>Owner ID</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 user-select-none ${selectedFilter === 'displayName' ? 'selected' : ''}`} onClick={() => sortTable("displayName")}>Owner Name</p>
                        <select className="card  text-white bg-primary p-3 m-0 rounded w-25" onChange={handleStatusFilter} value={statusFilter}>
                            <option>Status Filter</option>
                            <option>Active</option>
                            <option>Needs Attention</option>
                            <option>Suspended</option>
                            <option>Removed</option>
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
                                <th>Clan ID</th>
                                <th>Clan Name</th>
                                <th>Clan Tag</th>
                                <th>Created (mm/dd/yyyy)</th>
                                <th>Owner ID</th>
                                <th>Owner Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {filteredClans.map((clan) => (
                                <tr key={clan.id}>
                                    <td >{clan.id}</td>
                                    <td>{clan.ClanName}</td>
                                    <td>{clan.ClanTag}</td>
                                    <td>{clan.created}</td>
                                    <td>{clan.ownerID}</td>
                                    <td>{clan.displayName}</td>
                                    <td>
                                    <span className={`badge bg-${clan.status === "Active" ? "success" : clan.status === "Removed" ? "danger" : clan.status === "Needs Attention" ? "danger" : "warning"}`}>
                                        {clan.status} {/* Active=bg-green, Banned=bg-red, Needs Attention=bg-red, everything else=bg-orange */}
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