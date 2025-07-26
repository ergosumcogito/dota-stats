const fetchPlayerRawData = async (playerId, numMatches = 20) => {
    const [profileRes, wlRes, matchesRes] = await Promise.all([
        fetch(`https://api.opendota.com/api/players/${playerId}`),
        fetch(`https://api.opendota.com/api/players/${playerId}/wl?limit=${numMatches}`),
        fetch(`https://api.opendota.com/api/players/${playerId}/recentMatches`),
    ]);

    if (!profileRes.ok || !wlRes.ok || !matchesRes.ok) {
        throw new Error("Some data failed to load");
    }

    const [profile, wl, matches] = await Promise.all([
        profileRes.json(),
        wlRes.json(),
        matchesRes.json(),
    ]);

    return {
        profile,
        wl,
        recentMatches: matches.slice(0, numMatches),
    };
};

export default {
    fetchPlayerRawData,
};
