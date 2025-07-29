import React, { useEffect, useState } from 'react';
import heroService from 'services/HeroService';
import gameModeService from 'services/GameModeService';

const PlayerMatchHistory = ({ recentMatches, maxMatches = 20, itemsData }) => {
    const [heroImages, setHeroImages] = useState({});
    const [gameModes, setGameModes] = useState({});
    const [matchItems, setMatchItems] = useState({});

    // Helper to get cached match data from localStorage
    const getCachedMatchData = (matchId) => {
        try {
            const item = localStorage.getItem(`match_${matchId}`);
            return item ? JSON.parse(item) : null;
        } catch {
            return null;
        }
    };

    // Helper to save match data to localStorage
    const setCachedMatchData = (matchId, data) => {
        try {
            localStorage.setItem(`match_${matchId}`, JSON.stringify(data));
        } catch (err) {
            console.error(`Failed to cache match ${matchId} to localStorage`, err);
        }
    };

    // Fetch hero images for recent matches
    useEffect(() => {
        if (!recentMatches) return;
        const heroIds = [...new Set(recentMatches.slice(0, maxMatches).map(m => m.hero_id))];

        Promise.all(
            heroIds.map(id =>
                heroService.getHeroImageById(id).then(url => ({ id, url }))
            )
        ).then(results => {
            const imagesMap = {};
            results.forEach(({ id, url }) => {
                imagesMap[id] = url;
            });
            setHeroImages(imagesMap);
        });
    }, [recentMatches, maxMatches]);

    // Fetch game modes once
    useEffect(() => {
        gameModeService.getGameModes().then(setGameModes).catch(console.error);
    }, []);

    // Fetch match item data with localStorage caching
    useEffect(() => {
        if (!recentMatches) return;

        const matchesToFetch = recentMatches.slice(0, maxMatches);
        const newMatchItems = { ...matchItems };

        const fetchPromises = matchesToFetch.map(match => {
            const cachedData = getCachedMatchData(match.match_id);
            if (cachedData) {
                newMatchItems[match.match_id] = cachedData;
                return Promise.resolve(null);
            } else {
                return fetch(`https://api.opendota.com/api/matches/${match.match_id}`)
                    .then(res => res.json())
                    .then(data => {
                        const player = data.players.find(p => p.player_slot === match.player_slot);
                        if (!player) return null;

                        const items = [
                            player.item_0, player.item_1, player.item_2,
                            player.item_3, player.item_4, player.item_5,
                            player.item_neutral
                        ].filter(id => id && id !== 0);

                        const itemData = {
                            matchId: match.match_id,
                            items,
                            hasShard: !!player.aghanims_shard,
                            hasScepter: !!player.aghanims_scepter
                        };

                        setCachedMatchData(match.match_id, itemData);
                        newMatchItems[match.match_id] = itemData;
                        return itemData;
                    })
                    .catch(err => {
                        console.error(`Error fetching match ${match.match_id}`, err);
                        return null;
                    });
            }
        });

        Promise.all(fetchPromises).then(() => {
            setMatchItems(newMatchItems);
        });
    }, [recentMatches, maxMatches]);

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    const getItemImg = (itemId) => {
        const itemEntry = Object.values(itemsData).find(item => item.id === itemId);
        return itemEntry ? `https://cdn.cloudflare.steamstatic.com${itemEntry.img}` : '/images/placeholder.png';
    };

    if (!recentMatches || recentMatches.length === 0) {
        return <p>No match history available.</p>;
    }

    return (
        <div className="mt-2">
            <h2 className="text-1xl font-bold mb-2">Recent Matches</h2>
            <div className="bg-box shadow-lg px-3 py-2">
                {recentMatches.slice(0, maxMatches).map((match, index) => {
                    const isRadiant = match.player_slot < 128;
                    const isVictory = (isRadiant && match.radiant_win) || (!isRadiant && !match.radiant_win);

                    const resultColor = isVictory ? 'bg-secondary' : 'bg-accent';
                    const resultTextColor = isVictory ? 'text-secondary' : 'text-accent';
                    const gameModeName = gameModes[match.game_mode] || `Mode ${match.game_mode}`;
                    const backgroundColor = index % 2 === 0 ? 'bg-background' : 'bg-box';

                    const itemData = matchItems[match.match_id];

                    return (
                        <div
                            key={match.match_id || index}
                            className={`relative flex flex-col p-2 ${backgroundColor}`}
                        >
                            <div className={`absolute left-0 top-0 bottom-0 w-[7px] ${resultColor}`} />
                            <div className="pl-4 flex items-center w-full mb-2">
                                <img
                                    src={heroImages[match.hero_id] || '/images/placeholder.png'}
                                    alt="Hero"
                                    className="w-auto h-auto mr-3 max-w-[80px]"
                                />
                                <span className={`font-semibold ${resultTextColor} w-20`}>
                                    {isVictory ? 'Victory' : 'Defeat'}
                                </span>
                                <div className="flex flex-col text-sm text-text w-40">
                                    <span className="font-medium">{gameModeName}</span>
                                    <span className="text-xs">{formatDuration(match.duration)}</span>
                                </div>
                                <div className="font-mono text-sm">
                                    <span className="text-secondary font-bold">{match.kills}</span>/
                                    <span className="text-accent font-bold">{match.deaths}</span>/
                                    <span className="text-text font-bold">{match.assists}</span>
                                </div>

                            {itemData && (
                                <div className="pl-4 flex items-center flex-wrap">
                                    {itemData.items.map(id => (
                                        <img
                                            key={id}
                                            src={getItemImg(id)}
                                            alt={`Item ${id}`}
                                            className="w-auto h-auto max-h-[30px]"
                                        />
                                    ))}
                                    {itemData.hasScepter && <span className="text-xs pl-3 font-bold text-yellow-500">🌟 Scepter</span>}
                                    {itemData.hasShard && <span className="text-xs pl-3 font-bold text-blue-500">🔷 Shard</span>}
                                </div>
                            )}
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayerMatchHistory;
