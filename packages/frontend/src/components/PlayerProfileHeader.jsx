import React from 'react';
import steamIcon from 'assets/steam.svg';

// Avatar and Steam link section (LEFT)
const AvatarSection = ({ profile }) => (
    <div className="flex flex-col items-start min-w-[100px]">
        <img
            src={profile.avatarfull}
            alt={`Avatar of ${profile.personaname}`}
            className="w-32 h-32 object-cover mb-2"
        />
        <a
            href={profile.profileurl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-xs flex items-center gap-1"
        >
            <img src={steamIcon} alt="Steam" className="w-6 h-6" />
        </a>
    </div>
);

// Stats section with hero background (CENTER)
const StatsSection = ({ profile, heroImage, winrate, wins, losses, kda }) => (
    <div className="relative flex-1 pt-3 px-4 overflow-hidden">
        {heroImage && (
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            />
        )}
        <div className="absolute inset-0 bg-background/50"/>
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-start h-full">
            <h2 className="text-3xl font-bold mb-2">{profile.personaname}</h2>
            <div className="text-sm md:text-xl space-y-1">
                <div className="flex flex-row gap-x-20 items-start">
                    {/* Win Rate */}
                    <div className="flex flex-col">
                        <p>
                            <span className="font-bold">WR:</span>{' '}
                            <span className={winrate >= 50 ? 'text-secondary' : 'text-accent'}>
                {winrate}%
              </span>
                        </p>
                        <p className="text-text text-sm">
                            ({wins}W / {losses}L)
                        </p>
                    </div>
                    {/* KDA */}
                    <div className="flex flex-col">
                        <p>{kda}</p>
                        <p className="text-text text-sm">Average KDA</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Rank info section (RIGHT)
const RankSection = ({ rank_tier, leaderboard_rank }) => (
    <div className="flex flex-col justify-center items-center min-w-[120px] text-right">
        <p className="text-sm">
            <span className="font-semibold">Rank Tier:</span> {rank_tier || 'N/A'}
        </p>
        {leaderboard_rank && (
            <p className="text-yellow-400 text-sm">#{leaderboard_rank}</p>
        )}
    </div>
);

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
            <AvatarSection profile={profile} />
            <StatsSection
                profile={profile}
                heroImage={heroImage}
                winrate={winrate}
                wins={wins}
                losses={losses}
                kda={kda}
            />
            <RankSection rank_tier={rank_tier} leaderboard_rank={leaderboard_rank} />
        </div>
    );
};

export default PlayerProfileHeader;
