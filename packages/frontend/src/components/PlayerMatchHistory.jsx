import React, { useEffect, useState } from 'react';
import heroService from 'services/HeroService';
import gameModeService from 'services/GameModeService';

const PlayerMatchHistory = ({ recentMatches, maxMatches = 20 }) => {
    const [heroImages, setHeroImages] = useState({});
    const [gameModes, setGameModes] = useState({});

    // Fetch hero images
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

    // Fetch game modes
    useEffect(() => {
        gameModeService.getGameModes().then(setGameModes).catch(console.error);
    }, []);

    if (!recentMatches || recentMatches.length === 0) {
        return <p>No match history available.</p>;
    }

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

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

                    // Alternating background color
                    const backgroundColor = index % 2 === 0 ? 'bg-background' : 'bg-box';

                    return (
                        <div
                            key={match.match_id || index}
                            className={`relative flex items-center p-2 ${backgroundColor}`}
                        >
                            {/* Left vertical indicator */}
                            <div className={`absolute left-0 top-0 bottom-0 w-[7px] ${resultColor}`} />

                            <div className="pl-4 flex items-center w-full">
                            {/* Hero image */}
                            <img
                                src={heroImages[match.hero_id] || '/images/placeholder.png'}
                                alt="Hero"
                                className="w-auto h-auto mr-3 max-w-[80px]"
                            />

                            {/* Victory / Defeat text */}
                            <span className={`font-semibold ${resultTextColor} w-20`}>
                                {isVictory ? 'Victory' : 'Defeat'}
                            </span>

                            {/* Game mode and duration */}
                            <div className="flex flex-col text-sm text-text w-40">
                                <span className="font-medium">{gameModeName}</span>
                                <span className="text-xs">{formatDuration(match.duration)}</span>
                            </div>

                            {/* KDA */}
                            <div className="font-mono text-sm">
                                <span className="text-secondary font-bold">{match.kills}</span>/
                                <span className="text-accent font-bold">{match.deaths}</span>/
                                <span className="text-text font-bold">{match.assists}</span>
                            </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayerMatchHistory;
