import React from 'react';

const PlayerProfileHeader = ({ profileData }) => {
    if (!profileData) return null;

    return (
        <div className="mt-4 text-center">
            <img
                src={profileData.profile.avatarfull}
                alt="Avatar"
                className="w-32 h-32 rounded-full mx-auto"
            />
            <h2 className="mt-2 text-xl font-semibold">{profileData.profile.name}</h2>
            <p>Rank Tier: {profileData.rank_tier || 'N/A'}</p>
            <p>Leaderboard Rank: {profileData.leaderboard_rank || 'N/A'}</p>
            <a
                href={profileData.profile.profileurl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
            >
                View Profile
            </a>
        </div>
    );
};

export default PlayerProfileHeader;
