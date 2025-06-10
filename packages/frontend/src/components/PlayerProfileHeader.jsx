import React from 'react';
import steamIcon from 'assets/steam.svg';

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
        <div className="w-full p-4 bg-box shadow-lg text-white relative flex flex-row gap-4 items-stretch overflow-hidden">
            {/* LEFT: Avatar and Steam */}
            <div className="flex flex-col items-center justify-center min-w-[100px]">
                <img
                    src={profile.avatarfull}
                    alt="Avatar"
                    className="w-30 h-30 object-cover mb-2"
                />
                <a
                    href={profile.profileurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs flex items-center gap-1"
                >
                    <img src={steamIcon} alt="Steam" className="w-4 h-4" />
                </a>
            </div>

            {/* CENTER: Stats on hero background */}
            <div className="relative flex-1 p-4 overflow-hidden">
                {/* Background hero image */}
                {heroImage && (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-50"
                        style={{ backgroundImage: `url(${heroImage})` }}
                    />
                )}
                {/* Overlay to darken */}
                <div className="absolute inset-0 bg-opacity-40" />
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center h-full">
                    <h2 className="text-3xl font-bold mb-2">{profile.personaname}</h2>
                    <div className="text-sm md:text-base space-y-1">
                        <p>
                            <span className="font-bold">Winrate:</span> {winrate}%
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

            {/* RIGHT: Rank info */}
            <div className="flex flex-col justify-center items-end min-w-[120px] text-right">
                <p className="text-sm">
                    <span className="font-semibold">Rank Tier:</span> {rank_tier || 'N/A'}
                </p>
                {leaderboard_rank && (
                    <p className="text-yellow-400 text-sm">#{leaderboard_rank}</p>
                )}
            </div>
        </div>
    );
};

export default PlayerProfileHeader;
