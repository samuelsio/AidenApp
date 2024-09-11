import { useState, useEffect } from "react";
import "./StreamersList.scss";
import streamersData from "../../pages/AdminStreams/StreamersData.json"

export default function StreamersList(){
    const streamers = streamersData.streamers
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [statusFilter, setStatusFilter] = useState("Status Filter")
    const [filteredStreamers, setFilteredStreamers] = useState(streamers)

    const sortTable = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
          direction = "desc";
        }
    
        const sortedStreamers = [...filteredStreamers].sort((a, b) => {
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
        
        
        setFilteredStreamers(sortedStreamers);
        setSortConfig({ key, direction });
        setSelectedFilter(key); //Used to colour the currently selected filter
      };    

      const handleStatusFilter = (event) => {
        const status = event.target.value
            setStatusFilter(status)
        if (status === "Status Filter" || status === "") {
            setFilteredStreamers(streamers);
        } else {
            setFilteredStreamers(streamers.filter(streamer => streamer.status === status))
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
              <div className="col-md-9">
                <div className="card bg-secondary text-white p-2">
                    <div className="StreamersList d-flex w-100 align-items-center justify-content-evenly">
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 ${selectedFilter === 'id' ? 'selected' : ''}`} onClick={() => sortTable('id')}>ID</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 ${selectedFilter === 'streamTitle' ? 'selected' : ''}`} onClick={() => sortTable('streamTitle')}>Stream Title</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 ${selectedFilter === 'streamerName' ? 'selected' : ''}`} onClick={() => sortTable("streamerName")}>Streamer</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 ${selectedFilter === 'genre' ? 'selected' : ''}`} onClick={() => sortTable('genre')}>Genre</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 ${selectedFilter === 'viewerCount' ? 'selected' : ''}`} onClick={() => sortTable('viewerCount')}>Last Viewer count</p>
                        <select className="card  text-white bg-primary p-3 m-0 rounded w-25" onChange={handleStatusFilter} value={statusFilter}>
                            <option>Status Filter</option>
                            <option>Featured</option>
                            <option>Trending</option>
                            <option>Needs Attention</option>
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
                                <th>ID</th>
                                <th>Stream Title</th>
                                <th>Streamer Name</th>
                                <th>Genre</th>
                                <th>Last Viewer count</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {filteredStreamers.map((streamer) => (
                                <tr key={streamer.id}>
                                    <td >{streamer.id}</td>
                                    <td>{streamer.streamTitle}</td>
                                    <td>{streamer.streamerName}</td>
                                    <td>{streamer.genre}</td>
                                    <td>{streamer.viewerCount}</td>
                                    <td>
                                    <span className={`badge bg-${streamer.status === "Featured" ? "success" : streamer.status === "Trending" ? "success" : streamer.status === "Removed" ? "danger" : streamer.status === "Needs Attention" ? "warning" : "warning"}`}>
                                        {streamer.status} {/* Active=bg-green, Removed=bg-red, Needs Attention=bg-red, everything else=bg-orange */}
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