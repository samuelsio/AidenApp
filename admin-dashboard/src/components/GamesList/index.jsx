import { useState, useEffect } from "react";
import "./GamesList.scss";
import gamesData from "../../pages/AdminGames/dataGames.json"


export default function GamesList(){
    const games = gamesData.games
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [statusFilter, setStatusFilter] = useState("Status Filter")
    const [filteredGames, setFilteredGames] = useState(games)
    const [storeFilter, setStoreFilter] = useState("Store Filter")

    const applyFilters = () => {
        let statusFiltered = games;
        let storeFiltered = games;

        if (statusFilter && statusFilter !== "Status Filter") {
            statusFiltered = games.filter(game => game.status === statusFilter);
        }
        if (storeFilter && storeFilter !== "Store Filter") {
            if (storeFilter === "Everything Else") {
                storeFiltered = games.filter(game => !game.store.Steam && !game.store.Epic && !game.store.GOG);
            } else {
                storeFiltered = games.filter(game => game.store[storeFilter])
            }
        }

        const filteredData = games.filter(game => 
            statusFiltered.includes(game) && storeFiltered.includes(game)
        );
        setFilteredGames(filteredData);
    }

    const sortTable = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
        }

        const sortedGames = [...filteredGames].sort((a, b) => {
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
        
        
        setFilteredGames(sortedGames);
        setSortConfig({ key, direction });
        setSelectedFilter(key); //Used to colour the currently selected filter
    };    

    
    

    const handleStatusFilter = (event) => {
            setStatusFilter(event.target.value)
    };

    const handleStoreFilter = (event) => {
        
            setStoreFilter(event.target.value)
    };


    useEffect(() => {
        applyFilters();
    }, [statusFilter, storeFilter]);

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
                    <div className="GamesList d-flex w-100 align-items-center justify-content-evenly">
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 ${selectedFilter === 'id' ? 'selected' : ''}`} onClick={() => sortTable('id')}>ID</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 ${selectedFilter === 'name' ? 'selected' : ''}`} onClick={() => sortTable('name')}>Game Name</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 ${selectedFilter === 'twitter_handle' ? 'selected' : ''}`} onClick={() => sortTable("twitter_handle")}>Dev Twitter</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 ${selectedFilter === 'twitch_handle' ? 'selected' : ''}`} onClick={() => sortTable("twitch_handle")}>Dev Twitch</p>
                        <p className={`card  text-white bg-primary p-3 m-0 rounded w-25 ${selectedFilter === 'created' ? 'selected' : ''}`} onClick={() => sortTable('created')}>Release Date</p>
                        <select className="card text-white bg-primary p-3 m-0 rounded w-25" onChange={handleStoreFilter} value={storeFilter}>
                            <option value="">Store Filter</option>
                            <option value="Steam">Steam</option>
                            <option value="Epic">Epic Games</option>
                            <option value="GOG">GOG</option>
                            <option value="Everything Else">Everything Else</option>
                        </select>
                        <select className="card  text-white bg-primary p-3 m-0 rounded w-25" onChange={handleStatusFilter} value={statusFilter}>
                            <option>Status Filter</option>
                            <option>Featured</option>
                            <option>Trending</option>
                            <option>Out of Loop</option>
                            <option>Push</option>
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
                                <th>Game Name</th>
                                <th>Dev Twitter</th>
                                <th>Dev Twitch</th>
                                <th>Stores</th>
                                <th>Released (mm/dd/yyyy)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {filteredGames.map((game) => (
                                <tr key={game.id}>
                                    <td >{game.id}</td>
                                    <td>{game.name}</td>
                                    <td>{game.twitter_handle}</td>
                                    <td>{game.twitch_handle}</td>
                                    <td>{Object.entries(game.store).map(([storeName], index, array) => (
                                        <span key={storeName}>
                                        {storeName}
                                        {index < array.length - 1 ? " " : ""}
                                        </span>
                                    ))}
                                    </td>
                                    <td>{game.created}</td>
                                    <td>
                                    <span className={`badge bg-${game.status === "Featured" ? "success" : game.status === "Trending" ? "success" : game.status === "Out of Loop" ? "danger" : game.status === "Needs Attention" ? "danger" : "warning"}`}>
                                        {game.status} 
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