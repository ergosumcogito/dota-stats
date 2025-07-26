import heroService from "services/HeroService";

export const mapHeaderData = async ({ profile, wl, recentMatches }) => {
    const heroCount = {};
    recentMatches.forEach(match => {
        heroCount[match.hero_id] = (heroCount[match.hero_id] || 0) + 1;
    });

    const mostPlayedHeroId = Object.entries(heroCount).sort((a, b) => b[1] - a[1])[0]?.[0];
    const heroImage = mostPlayedHeroId
        ? await heroService.getHeroImageById(mostPlayedHeroId)
        : null;

    const kills = recentMatches.reduce((sum, m) => sum + m.kills, 0);
    const deaths = recentMatches.reduce((sum, m) => sum + m.deaths, 0);
    const assists = recentMatches.reduce((sum, m) => sum + m.assists, 0);

    const rankIconId = profile.rank_tier ? Math.floor(profile.rank_tier / 10) : null;
    const rankIconUrl = rankIconId
        ? `https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${rankIconId}.png`
        : null;

    return {
        profile: profile.profile,
        rank_tier: profile.rank_tier,
        rank_icon: rankIconUrl,
        leaderboard_rank: profile.leaderboard_rank,
        wins: wl.win,
        losses: wl.lose,
        winrate: ((wl.win / (wl.win + wl.lose)) * 100).toFixed(1),
        averageKills: (kills / recentMatches.length).toFixed(1),
        averageDeaths: (deaths / recentMatches.length).toFixed(1),
        averageAssists: (assists / recentMatches.length).toFixed(1),
        mostPlayedHeroId,
        heroImage,
    };
};

export const mapStatsData = ({ recentMatches }) => {
    let maxKills = -1, maxKillsHero = null;
    let maxDeaths = -1, maxDeathsHero = null;
    let maxAssists = -1, maxAssistsHero = null;

    let kills = 0, deaths = 0, assists = 0;

    recentMatches.forEach(match => {
        kills += match.kills;
        deaths += match.deaths;
        assists += match.assists;

        if (match.kills > maxKills) {
            maxKills = match.kills;
            maxKillsHero = match.hero_id;
        }
        if (match.deaths > maxDeaths) {
            maxDeaths = match.deaths;
            maxDeathsHero = match.hero_id;
        }
        if (match.assists > maxAssists) {
            maxAssists = match.assists;
            maxAssistsHero = match.hero_id;
        }
    });

    return {
        averageKills: (kills / recentMatches.length).toFixed(1),
        averageDeaths: (deaths / recentMatches.length).toFixed(1),
        averageAssists: (assists / recentMatches.length).toFixed(1),
        maxKills,
        maxKillsHero,
        maxDeaths,
        maxDeathsHero,
        maxAssists,
        maxAssistsHero,
    };
};
