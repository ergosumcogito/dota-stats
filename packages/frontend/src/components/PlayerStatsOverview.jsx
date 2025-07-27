import React from 'react';

const StatCard = ({ title, average, max, heroIcon, altText, textColor = "text-text" }) => {
    return (
        <div className="flex flex-col items-start min-w-[100px]">
            <h4 className={`text-sm mb-1 text-text`}>{title}</h4>

            <div className="flex items-center gap-2">
            <p className={`text-2xl font-bold leading-none ${textColor}`}>{average}</p>
            <p className={`text-xs mt-0.5 text-text`}>{max}</p>
            {heroIcon && (
                <img
                    src={heroIcon}
                    alt={altText}
                    className="w-8 h-auto object-contain mt-1"
                />
            )}
                </div>
        </div>
    );
};



const StatsOverview = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="w-full max-w-[500px]">
            <h3 className="text-1xl font-bold mb-1 mt-2 text-white">Average/Maximum stats</h3>

            <div className="bg-box shadow-lg px-3 py-2 flex flex-wrap gap-6 justify-start">
                <StatCard
                    title="Kills"
                    average={stats.averageKills}
                    max={stats.maxKills}
                    heroIcon={stats.maxKillsHeroImage}
                    altText="Hero with max kills"
                    textColor="text-secondary"
                />
                <StatCard
                    title="Deaths"
                    average={stats.averageDeaths}
                    max={stats.maxDeaths}
                    heroIcon={stats.maxDeathsHeroImage}
                    altText="Hero with max deaths"
                    textColor="text-accent"
                />
                <StatCard
                    title="Assists"
                    average={stats.averageAssists}
                    max={stats.maxAssists}
                    heroIcon={stats.maxAssistsHeroImage}
                    altText="Hero with max assists"
                />

                {/*
                GPM
                XPM
                Hero Damage
                Comebacks
                Throws
                APM
                */}


            </div>
        </div>
    );
};

export default StatsOverview;
