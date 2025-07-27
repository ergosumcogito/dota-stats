import React from 'react';

const StatCard = ({ title, average, max, heroIcon, altText }) => {
    console.log('StatCard props:', { title, average, max, heroIcon, altText });

    return (
        <div className="flex flex-col items-center min-w-[100px]">
            <h4 className="text-sm text-text mb-1">{title}</h4>
            <p className="text-2xl font-bold text-text leading-none">{average}</p>
            <p className="text-xs text-text mt-0.5">{max}</p>
            {heroIcon && (
                <img
                    src={heroIcon}
                    alt={altText}
                    className="w-10 h-10 object-contain mt-1"
                />
            )}
        </div>
    );
};


const StatsOverview = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="w-full max-w-[500px]">
            <h3 className="text-xl font-bold mb-3 text-white">Player average stats</h3>

            <div className="bg-box shadow-lg p-4 rounded-lg flex flex-wrap gap-6 justify-center">
                <StatCard
                    title="Kills"
                    average={stats.averageKills}
                    max={stats.maxKills}
                    heroIcon={stats.maxKillsHeroImage}
                    altText="Hero with max kills"
                />
                <StatCard
                    title="Deaths"
                    average={stats.averageDeaths}
                    max={stats.maxDeaths}
                    heroIcon={stats.maxDeathsHeroImage}
                    altText="Hero with max deaths"
                />
                <StatCard
                    title="Assists"
                    average={stats.averageAssists}
                    max={stats.maxAssists}
                    heroIcon={stats.maxAssistsHeroImage}
                    altText="Hero with max assists"
                />
            </div>
        </div>
    );
};

export default StatsOverview;
