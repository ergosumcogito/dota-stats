import React, { useState } from 'react';
import SearchBar from 'components/SearchBar';
import PlayerProfileHeader from 'components/PlayerProfileHeader';
import playerProfileService from "services/playerProfileService";

const PlayerProfilePage = () => {
    const [playerId, setPlayerId] = useState('');
    const [profileHeaderData, setProfileHeader] = useState(null);

    const handleSearch = async () => {
        try{
            const fetchedHeaderData = await playerProfileService.fetchPlayerHeaderData(playerId);
            console.log(fetchedHeaderData); // Debug output
            setProfileHeader(fetchedHeaderData);

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Player Profile</h1>

            <SearchBar value={playerId} onChange={(e) => setPlayerId(e.target.value)} onSearch={handleSearch} />
            <PlayerProfileHeader profileHeaderData={profileHeaderData} />
        </div>
    );
};

export default PlayerProfilePage;
