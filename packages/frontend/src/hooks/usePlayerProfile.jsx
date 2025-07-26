import { useState, useEffect } from 'react';
import playerProfileService from 'services/PlayerProfileService';
import { mapHeaderData } from 'utils/PlayerMappers';

export const usePlayerProfile = (playerId) => {
    const [playerProfileData, setPlayerProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!playerId) {
            setPlayerProfileData(null);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const rawData = await playerProfileService.fetchPlayerRawData(playerId);
                const mappedData = await mapHeaderData(rawData);
                setPlayerProfileData(mappedData);
            } catch (e) {
                setError(e);
                setPlayerProfileData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [playerId]);

    return { playerProfileData, loading, error };
};
