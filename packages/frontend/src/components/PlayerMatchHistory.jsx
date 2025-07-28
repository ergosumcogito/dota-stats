import React, { useEffect, useState } from 'react';
import heroService from 'services/HeroService';

const PlayerMatchHistory = ({ recentMatches, maxMatches = 20 }) => {
    const [heroImages, setHeroImages] = useState({});

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

    if (!recentMatches || recentMatches.length === 0) {
        return <p>No match history available.</p>;
    }

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    return (
        <div className="mt-6">
            <h2 className="text-1xl font-bold mb-2">Recent Matches</h2>
            <div className="space-y-2">
                {recentMatches.slice(0, maxMatches).map((match, index) => {
                    const isVictory = match.radiant === match.radiant_win
                        ? match.player_slot < 128
                        : match.player_slot >= 128;

                    return (
                        <div
                            key={match.match_id || index}
                            className={`flex items-center justify-between p-2  ${
                                isVictory ? 'bg-green-400' : 'bg-red-400'
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                <img
                                    src={heroImages[match.hero_id] || '/images/placeholder.png'}
                                    alt="Hero"
                                    className="w-10 h-10 "
                                />
                                <span className="font-semibold">
                                    {isVictory ? 'Victory' : 'Defeat'}
                                </span>
                            </div>
                            <div className="text-sm text-gray-700">
                                Mode: {match.game_mode}, Duration: {formatDuration(match.duration)}
                            </div>
                            <div className="font-mono text-sm">
                                {match.kills}/{match.deaths}/{match.assists}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayerMatchHistory;
