import React from 'react';

const PlayerProfileHeader = ({ profileHeaderData }) => {
    if (!profileHeaderData) return null;

    const {
        profile,
        rank_tier,
        leaderboard_rank,
        wins,
        losses,
        winrate,
        kda,
        heroImage,
    } = profileHeaderData;

    return (
        <div className="w-full p-4 bg-box rounded-2xl shadow-lg relative overflow-hidden text-white">
            {/* Hero background image */}
            {heroImage && (
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
            )}

            {/* Overlay to darken and soften the background */}
            <div className="absolute inset-0 bg-box bg-opacity-40" />

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                {/* Avatar and Basic Info */}
                <div className="flex items-center gap-4">
                    <img
                        src={profile.avatarfull}
                        alt="Avatar"
                        className="w-26 h-auto"
                    />
                    <div>
                        <h2 className="text-3xl font-bold">{profile.personaname}</h2>
                        <a
                            href={profile.profileurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline text-sm"
                        >
                            View Steam Profile
                        </a>
                        <p className="mt-1 text-sm">
                            Rank Tier: {rank_tier || 'N/A'}{' '}
                            {leaderboard_rank && (
                                <span className="text-yellow-400">#{leaderboard_rank}</span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex flex-col items-center md:items-end text-sm md:text-base">
                    <p>
                        <span className="font-semibold">Winrate:</span> {winrate}%
                    </p>
                    <p className="text-gray-300">
                        ({wins}W / {losses}L)
                    </p>
                    <p>
                        <span className="font-semibold">KDA:</span> {kda}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlayerProfileHeader;
