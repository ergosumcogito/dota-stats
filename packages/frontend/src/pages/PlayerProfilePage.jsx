import React, { useState } from 'react';
import SearchBar from 'components/SearchBar';
import PlayerProfileHeader from 'components/PlayerProfileHeader';
import { usePlayerProfile } from 'hooks/usePlayerProfile';

const PlayerProfilePage = () => {
    const [inputValue, setInputValue] = useState('');
    const [playerId, setPlayerId] = useState('');
    const { playerProfileData, loading, error } = usePlayerProfile(playerId);

    const handleSearch = () => {
      setPlayerId(inputValue.trim());
    };

    return (
        <div className="px-4">
            <h1>Player Profile (test with ID 127324702, 106305042)</h1>

            <SearchBar
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSearch={() => handleSearch()}
            />

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            {playerProfileData && <PlayerProfileHeader playerProfileData={playerProfileData} />}
        </div>
    );
};

export default PlayerProfilePage;
