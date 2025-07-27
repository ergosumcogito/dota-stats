import React, {useEffect, useState} from 'react';
import SearchBar from 'components/SearchBar';
import PlayerProfileHeader from 'components/PlayerProfileHeader';
import { usePlayerProfile } from 'hooks/usePlayerProfile';
import {useNavigate, useParams} from "react-router-dom";
import PlayerStatsOverview from "components/PlayerStatsOverview";

const PlayerProfilePage = () => {
    const { playerId: playerIdFromUrl } = useParams(); // get playerId from URL
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState(playerIdFromUrl || '');
    const [playerId, setPlayerId] = useState(playerIdFromUrl|| '');
    const { playerProfileData, playerStatsData, loading, error } = usePlayerProfile(playerId);

    const handleSearch = () => {
        const trimmed = inputValue.trim();
        if (trimmed) {
            // React router change the URL
            navigate(`/player-search/${trimmed}`);
            // Change state ???
            setPlayerId(trimmed);
        }
    };

    useEffect(() => {
        if (playerIdFromUrl && playerIdFromUrl !== playerId) {
            setInputValue(playerIdFromUrl);
            setPlayerId(playerIdFromUrl);
        }
    }, [playerIdFromUrl]);

    return (
        <div className="flex justify-center">
        <div className="w-full max-w-5xl px-4">
            <h1>Player Profile (test with ID 127324702, 106305042)</h1>

            <SearchBar
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSearch={() => handleSearch()}
            />

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            {playerProfileData && <PlayerProfileHeader playerProfileData={playerProfileData} />}
            {playerStatsData && <PlayerStatsOverview stats={playerStatsData} />}
        </div>
        </div>
    );
};

export default PlayerProfilePage;
