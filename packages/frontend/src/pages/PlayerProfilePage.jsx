import React, { useState } from 'react';
import SearchBar from 'components/SearchBar';
import PlayerProfileHeader from 'components/PlayerProfileHeader';

const PlayerProfilePage = () => {
    const [playerId, setPlayerId] = useState('');
    const [profileData, setProfileData] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://api.opendota.com/api/players/${playerId}`);
            if (!response.ok) {
                throw new Error('Player not found');
            }
            const data = await response.json();

            if (!data.profile) {
                throw new Error('Player profile is incomplete');
            }

            setProfileData(data);
        } catch (error) {
            console.error(error);
            alert('Error fetching player data');
        }
    };

    return (
        <div>
            <h1>Player Profile</h1>

            <SearchBar value={playerId} onChange={(e) => setPlayerId(e.target.value)} onSearch={handleSearch} />
            <PlayerProfileHeader profileData={profileData} />
        </div>
    );
};

export default PlayerProfilePage;
