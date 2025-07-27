let heroesCache = null;
let statsCache = null;

const fetchHeroes = async () => {
    if (heroesCache) return heroesCache;

    const response = await fetch('https://api.opendota.com/api/constants/heroes');
    if (!response.ok) throw new Error('Failed to fetch heroes');

    const data = await response.json();

    heroesCache = Object.values(data);
    return heroesCache;
};

const getHeroImageById = async (heroId) => {
    const heroes = await fetchHeroes();
    const hero = heroes.find(h => h.id === +heroId);
    if (!hero) return null;

    const name = hero.name.replace('npc_dota_hero_', '');
    return `https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/${name}.png`;
};

const fetchHeroStats = async () => {
    if (statsCache) return statsCache;
    const response = await fetch('https://api.opendota.com/api/heroStats');
    if (!response.ok) throw new Error('Failed to fetch hero stats');

    statsCache = await response.json();
    return statsCache;
};

// Function to calculate the color based on the pick rate
const getPickRateColor = (pickRate) => {
    const hue = (pickRate * 120).toString(10);
    return `hsl(${hue},100%,50%)`;
};

const getHeroStats = async () => {
    const stats = await fetchHeroStats();

    // Calculate total picks for each rank across all heroes
    const totalPicksByRank = Array.from({ length: 8 }, (_, i) =>
        stats.reduce((sum, hero) => sum + (hero[`${i + 1}_pick`] || 0), 0)
    );

    return stats.map(heroStats => {
        // Calculate bracket stats
        const calculateBracketStats = (ranks) => {
            const heroPicks = ranks.reduce((sum, rank) =>
                sum + (heroStats[`${rank}_pick`] || 0), 0);
            const heroWins = ranks.reduce((sum, rank) =>
                sum + (heroStats[`${rank}_win`] || 0), 0);
            const totalPicksInBracket = ranks.reduce((sum, rank) =>
                sum + totalPicksByRank[rank - 1], 0);

            return {
                pickRate: totalPicksInBracket > 0 ? heroPicks / totalPicksInBracket : 0,
                winRate: heroPicks > 0 ? heroWins / heroPicks : 0
            };
        };

        const highStats = calculateBracketStats([8, 7, 6]);
        const midStats = calculateBracketStats([5, 4]);
        const lowStats = calculateBracketStats([3, 2, 1]);

        // Calculate overall stats across all ranks
        const heroTotalPicks = totalPicksByRank.reduce((sum, _, i) =>
            sum + (heroStats[`${i + 1}_pick`] || 0), 0);
        const heroTotalWins = totalPicksByRank.reduce((sum, _, i) =>
            sum + (heroStats[`${i + 1}_win`] || 0), 0);
        const totalPicks = totalPicksByRank.reduce((a, b) => a + b, 0);

        const overallPickRate = totalPicks > 0 ? heroTotalPicks / totalPicks : 0;

        return {
            id: heroStats.id,
            name: heroStats.name,
            localized_name: heroStats.localized_name,
            img: `https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroStats.name.replace('npc_dota_hero_', '')}.png`,
            overall_pick_rate: overallPickRate,
            overall_win_rate: heroTotalPicks > 0 ? heroTotalWins / heroTotalPicks : 0,
            high_pick_rate: highStats.pickRate,
            high_win_rate: highStats.winRate,
            mid_pick_rate: midStats.pickRate,
            mid_win_rate: midStats.winRate,
            low_pick_rate: lowStats.pickRate,
            low_win_rate: lowStats.winRate,
            pick_rate_color: getPickRateColor(overallPickRate) // Add the pick rate color
        };
    });
};

export default { fetchHeroes, getHeroImageById, getHeroStats, getPickRateColor };
