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
            <div className="bg-box shadow-lg px-3 py-2">
                {recentMatches.slice(0, maxMatches).map((match, index) => {
                    const isVictory = match.radiant === match.radiant_win
                        ? match.player_slot < 128
                        : match.player_slot >= 128;

                    // Alternating row colors
                    const backgroundColor = index % 2 === 0 ? 'bg-background' : 'bg-box';

                    // Color for Victory/Defeat text
                    const resultTextColor = isVictory ? 'text-secondary' : 'text-accent';

                    return (
                        <div
                            key={match.match_id || index}
                            className={`flex items-center justify-between p-2 ${backgroundColor}`}
                        >
                            <div className="flex items-center space-x-2">
                                <img
                                    src={heroImages[match.hero_id] || '/images/placeholder.png'}
                                    alt="Hero"
                                    className="w-10 h-10"
                                />
                                <span className={`font-semibold ${resultTextColor}`}>
                                    {isVictory ? 'Victory' : 'Defeat'}
                                </span>
                            </div>
                            <div className="text-sm text-text">
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
