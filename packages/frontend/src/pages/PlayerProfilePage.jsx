import React, {useEffect, useState} from 'react';
import PlayerProfileHeader from 'components/PlayerProfileHeader';
import { usePlayerProfile } from 'hooks/usePlayerProfile';
import { useParams } from "react-router-dom";
import PlayerStatsOverview from "components/PlayerStatsOverview";
import PlayerMatchHistory from "components/PlayerMatchHistory";

const PlayerProfilePage = () => {
    const { playerId: playerIdFromUrl } = useParams();
    const [playerId, setPlayerId] = useState(playerIdFromUrl || '');
    const { playerProfileData, playerStatsData, rawRecentMatches, loading, error } = usePlayerProfile(playerId);

    const [itemsData, setItemsData] = useState(null);

    useEffect(() => {
        if (playerIdFromUrl && playerIdFromUrl !== playerId) {
            setPlayerId(playerIdFromUrl);
        }
    }, [playerIdFromUrl]);

    useEffect(() => {
        fetch('https://api.opendota.com/api/constants/items')
            .then(res => res.json())
            .then(setItemsData)
            .catch(console.error);
    }, []);

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-5xl px-4">
                <h1 className="font-bold pb-4">Player Profile (test with IDs 127324702, 106305042, 113331514)</h1>

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                {playerProfileData && <PlayerProfileHeader playerProfileData={playerProfileData} />}
                {playerStatsData && <PlayerStatsOverview stats={playerStatsData} />}
                {rawRecentMatches && itemsData &&
                    <PlayerMatchHistory recentMatches={rawRecentMatches} itemsData={itemsData} />
                }
            </div>
        </div>
    );
};


export default PlayerProfilePage;
