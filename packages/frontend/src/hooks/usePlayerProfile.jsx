import { useState, useEffect } from 'react';
import playerProfileService from 'services/PlayerProfileService';
import { mapHeaderData, mapStatsData } from 'utils/PlayerMappers';

export const usePlayerProfile = (playerId) => {
    const [playerProfileData, setPlayerProfileData] = useState(null);
    const [playerStatsData, setPlayerStatsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!playerId) {
            setPlayerProfileData(null);
            setPlayerStatsData(null);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const rawData = await playerProfileService.fetchPlayerRawData(playerId);
                const mappedHeader = await mapHeaderData(rawData);
                const mappedStats = await mapStatsData({recentMatches: rawData.recentMatches});
                setPlayerProfileData(mappedHeader);
                setPlayerStatsData(mappedStats);
            } catch (e) {
                setError(e);
                setPlayerProfileData(null);
                setPlayerStatsData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [playerId]);

    return { playerProfileData, playerStatsData, loading, error };
};
