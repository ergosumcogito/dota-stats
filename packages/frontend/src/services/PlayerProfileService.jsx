import heroService from "services/HeroService";

const fetchPlayerHeaderData = async (playerId, numMatches=50) => {
    try {
        const [profileRes, wlRes, matchesRes] = await Promise.all([
           fetch(`https://api.opendota.com/api/players/${playerId}`),
           fetch(`https://api.opendota.com/api/players/${playerId}/wl?limit=${numMatches}`),
           fetch(`https://api.opendota.com/api/players/${playerId}/recentMatches`),
        ]);

        if (!profileRes.ok || !wlRes.ok || !matchesRes.ok) {
            throw new Error('Some data failed to load');
        }

        const profileData = await profileRes.json();
        const wlData = await wlRes.json();
        const recentMatches = await matchesRes.json();

        // Most Played Hero
        const heroCount = {};
        recentMatches.forEach(match => {
            if (heroCount[match.hero_id]) {
                heroCount[match.hero_id]++;
            } else {
                heroCount[match.hero_id] = 1;
            }
        });

        const mostPlayedHeroId = Object.entries(heroCount).sort((a, b) => b[1] - a[1])[0]?.[0];

        // Get URL of most played hero's image
        const heroImage = mostPlayedHeroId ? await heroService.getHeroImageById(mostPlayedHeroId): null;


        // Average KDA
        let kills = 0, deaths = 0, assists = 0;
        recentMatches.slice(0, numMatches).forEach(match => {
            kills += match.kills;
            deaths += match.deaths;
            assists += match.assists;
        });

        const averageKills = (kills / numMatches).toFixed(1);
        const averageDeaths = (deaths / numMatches).toFixed(1);
        const averageAssists = (assists / numMatches).toFixed(1);

        return {
            profile: profileData.profile,
            rank_tier: profileData.rank_tier,
            leaderboard_rank: profileData.leaderboard_rank,
            wins: wlData.win,
            losses: wlData.lose,
            winrate: ((wlData.win / (wlData.win + wlData.lose)) * 100).toFixed(1),
            averageKills: averageKills,
            averageDeaths: averageDeaths,
            averageAssists: averageAssists,
            mostPlayedHeroId,
            heroImage,
        };
    } catch (error) {
        console.log(error);
        throw new Error('Error while fetching player header data');
    }
};

export default { fetchPlayerHeaderData };