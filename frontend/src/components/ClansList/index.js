import React, { useState} from 'react';
import "./ClansList.scss";
import filter from "../../images/filter.png";
import ClansData from "../../pages/Clans/ClanData.json";
import ClansCard from '../ClansCard';


export default function ClansList() {
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByMembers, setSortByMembers] = useState(true);    


    const handleImageClick = () => {
        setIsVisible(!isVisible)
    };


    
    const handleSortChange = () => {
        setSortByMembers(!sortByMembers); 
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log("Current search term:", e.target.value);
    };


    const filteredClansData = ClansData.Clans.filter(clan => 
        clan.ClanName.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        if (sortByMembers) {
            return b.Members.length - a.Members.length; 
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
                        <div className={`filter-text ${isVisible ? '' : 'visible'}`}>
                            <div className='filter-mutual'>
                                <p>Filter By: </p>
                                <label> Mutual Friends
                                    <input type='checkbox' label='Filter' placeholder='Filter' />
                                </label>
                                <label> Mutual Games
                                    <input type='checkbox' label='Filter' placeholder='Filter' />
                                </label>
                                <label> Owned Clans
                                    <input type='checkbox' label='Filter' placeholder='Filter' />
                                </label>
                            </div>
                            <div className='filter-rep'>
                                <p>Order By: </p>
                                <label> Members
                                    <input type='checkbox' label='Filter' placeholder='Filter' checked onChange={handleSortChange} />
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