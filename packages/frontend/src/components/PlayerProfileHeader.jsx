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
            <img src={steamIcon} alt="Steam" className="w-7 h-7" />
        </a>
    </div>
);

// Stats section with hero background (CENTER)
const StatsSection = ({ profile, heroImage, winrate, wins, losses, averageKills, averageDeaths, averageAssists }) => (
    <div className="relative flex-1 aspect-[22/9] max-w-[500px] pt-3 px-4">
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
                            Wins:{wins} Losses:{losses}
                        </p>
                        <WinrateBar wins={wins} losses={losses} />
                    </div>
                    {/* KDA */}
                    <div className="flex flex-col">
                        <p>
                            <span className="text-secondary">{averageKills}</span> /{' '}
                            <span className="text-accent">{averageDeaths}</span> /{' '}
                            <span className="text-text">{averageAssists}</span>
                        </p>
                        <p className="text-text text-sm">Average KDA</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const WinrateBar = ({ wins, losses }) => {
    const total = wins + losses;
    const winPercent = (wins / total) * 100;
    const lossPercent = (losses / total) * 100;

    return (
        <div className="w-full h-2 mt-1 rounded-full bg-gray-700 overflow-hidden flex">
            <div
                className="bg-secondary"
                style={{ width: `${winPercent}%` }}
                title={`Wins: ${wins}`}
            />
            <div
                className="bg-accent"
                style={{ width: `${lossPercent}%` }}
                title={`Losses: ${losses}`}
            />
        </div>
    );
};

// Rank info section (RIGHT)
const RankSection = ({ rank_tier, rank_icon, leaderboard_rank }) => (
    <div className="flex flex-col justify-center items-center min-w-[120px] text-right">
        {rank_icon && (
            <img
                src={rank_icon}
                alt={`Rank icon ${rank_tier}`}
                className="w-32 h-auto mb-2"
            />
        )}
        <p className="text-sm">
            <span className="font-semibold">Rank Tier:</span> {rank_tier || 'N/A'}
        </p>
        {leaderboard_rank && (
            <p className="text-yellow-400 text-sm">#{leaderboard_rank}</p>
        )}
    </div>
);

const PlayerProfileHeader = ({ playerProfileData }) => {
    if (!playerProfileData) return null;

    const {
        profile,
        rank_tier,
        rank_icon,
        leaderboard_rank,
        wins,
        losses,
        winrate,
        averageKills,
        averageDeaths,
        averageAssists,
        heroImage,
    } = playerProfileData;

    return (
        <div className="w-full p-4 bg-box shadow-lg text-white relative flex flex-row gap-4 items-stretch overflow-hidden">
            <AvatarSection profile={profile} />
            <StatsSection
                profile={profile}
                heroImage={heroImage}
                winrate={winrate}
                wins={wins}
                losses={losses}
                averageKills={averageKills}
                averageDeaths={averageDeaths}
                averageAssists={averageAssists}
            />
            <RankSection rank_tier={rank_tier} rank_icon={rank_icon} leaderboard_rank={leaderboard_rank} />
        </div>
    );
};

export default PlayerProfileHeader;
