import React, { useState} from 'react';
import "./ClansList.scss";
import filter from "../../images/filter.png";
import ClansData from "../../pages/Clans/ClanData.json";
import ClansCard from '../ClansCard';


export default function ClansList() {
    const [isFilterVisible, setisFilterVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');  

    const [filterOptions, setFilterOptions] = useState({
        "mutualFriends": false,
        "mutualGames": false,
        "ownedClans": false,
        "orderBy": "members",
    })

    const handleImageClick = () => {
        setisFilterVisible(!isFilterVisible)
    };


    
    const handleSortChange = (e) => {
        const value = e.target.value;
        setFilterOptions(prevOptions => ({
            ...prevOptions,
            orderBy: value // Update orderBy in filterOptions
        }));
    }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log("Current search term:", e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilterOptions(prevOptions => ({
            ...prevOptions,
            [name]: checked
        }));
    };

    // Update the filteredClansData to consider filter options
    const filteredClansData = ClansData.Clans.filter(clan => {
        const matchesSearch = clan.ClanName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMutualFriends = !filterOptions.mutualFriends || clan.MutualFriends; // Assuming clan has MutualFriends property
        const matchesMutualGames = !filterOptions.mutualGames || clan.MutualGames; // Assuming clan has MutualGames property
        const matchesOwnedClans = !filterOptions.ownedClans || clan.Owned; // Assuming clan has Owned property
        return matchesSearch && matchesMutualFriends && matchesMutualGames && matchesOwnedClans;
    }).sort((a, b) => {
        if (filterOptions.orderBy === "members") { // Use orderBy from filterOptions
            return b.Members.length - a.Members.length; 
        } else if (filterOptions.orderBy === "alphabetical") { // New condition for alphabetical sorting
            return a.ClanName.localeCompare(b.ClanName);
        }
        return 0; 
    });

    return(
        <div className='ClansList'>
            <div className='ClansList__wrapper'>
                <div className='ClansList__search'>
                    <input className='form-input' type='text' name='ClansSearch' id='ClansSearch' placeholder='Search for a clan' value={searchTerm} onChange={handleSearchChange}></input>
                    <div className='ClansList__filter'>
                    <img className='filter' src={filter} alt='filter' width='25px' height='25px' onClick={handleImageClick} />
                        <div className={`filter-text ${isFilterVisible ? 'visible' : ''}`}>
                            <div className='filter-mutual'>
                                <p>Filter By: </p>
                                <label> Mutual Friends
                                    <input type='checkbox' name='mutualFriends' onChange={handleFilterChange} />
                                </label>
                                <label> Mutual Games
                                    <input type='checkbox' name='mutualGames' onChange={handleFilterChange} />
                                </label>
                                <label> Owned Clans
                                    <input type='checkbox' name='ownedClans' onChange={handleFilterChange} />
                                </label>
                            </div>
                            <div className='filter-rep'>
                                <p>Order By: </p>
                                <label> Members
                                    <select onChange={handleSortChange} defaultValue={filterOptions.orderBy}>
                                        <option value="alphabetical">Alphabetical</option>
                                        <option value="members">Members</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
                <div className='ClansCard__list'>
                    {filteredClansData.map(ClansData =>(
                        <ClansCard 
                        key={ClansData.ClanName}
                        ClanName={ClansData.ClanName}
                        ClanBackground={ClansData.ClanBackground}
                        ClanImage={ClansData.ClanImage}
                        Members={ClansData.Members}
                        ClanTag={ClansData.ClanTag}
                        ClanHeader={ClansData.ClanHeader}
                        
                        />
                    ))}
                </div>
        </div>
        
    )
}