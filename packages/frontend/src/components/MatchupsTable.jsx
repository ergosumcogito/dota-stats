import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MatchupsTable = ({ heroId }) => {
  const [matchups, setMatchups] = useState([]);
  const [heroData, setHeroData] = useState({});
  const [maxGames, setMaxGames] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchupsRes, heroStatsRes] = await Promise.all([
          axios.get(`https://api.opendota.com/api/heroes/${heroId}/matchups`),
          axios.get("https://api.opendota.com/api/heroStats"),
        ]);

        const heroMap = {};
        for (const hero of heroStatsRes.data) {
          heroMap[hero.id] = {
            name: hero.localized_name,
            img: `https://cdn.cloudflare.steamstatic.com${hero.img}`,
            id: hero.id,
          };
        }

        const sorted = matchupsRes.data
          .filter((m) => m.games_played >= 10)
          .map((m) => ({
            ...m,
            winRate: ((m.wins / m.games_played) * 100).toFixed(2),
          }))
          .sort((a, b) => b.winRate - a.winRate);

        const max = Math.max(...sorted.map((m) => m.games_played));
        setMaxGames(max);
        setHeroData(heroMap);
        setMatchups(sorted);
      } catch (error) {
        console.error("Error loading matchups:", error);
      }
    };

    if (heroId) fetchData();
  }, [heroId]);

  const handleHeroClick = (id) => {
    navigate(`/hero?id=${id}`);
  };

  return (
    <div className="w-full mt-10 px-4 text-white font-sans">
      {/* Title: Matchups */}
      <div className="bg-[#213056] py-5 mb-4">
        <h2 className="text-2xl text-white text-center font-bold tracking-wide">
          Matchups
        </h2>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-12 gap-x-6 bg-[#182135] text-white text-sm font-semibold uppercase px-6 py-3 mb-3">
        <div className="col-span-4">Hero</div>
        <div className="col-span-4">Games</div>
        <div className="col-span-4">Win %</div>
      </div>

      {/* Matchup rows */}
      <div className="flex flex-col gap-y-3">
        {matchups.slice(0, 10).map((m, idx) => {
          const hero = heroData[m.hero_id];
          const gameBarWidth = ((m.games_played / maxGames) * 100).toFixed(1);
          const winBarWidth = m.winRate;

          return (
            <div
              key={idx}
              className="grid grid-cols-12 gap-x-6 items-center bg-[#182135] px-6 py-5 w-full"
            >
              {/* Hero */}
              <div
                className="col-span-4 flex items-center gap-4 cursor-pointer"
                onClick={() => handleHeroClick(hero.id)}
              >
                {hero && (
                  <>
                    <img
                      src={hero.img}
                      alt={hero.name}
                      className="w-10 h-10"
                    />
                    <span className="text-[#b574f9] font-medium text-base hover:underline">
                      {hero.name}
                    </span>
                  </>
                )}
              </div>

              {/* Games played */}
              <div className="col-span-4 text-sm">
                <span className="block mb-1">{m.games_played}</span>
                <div className="w-1/2 h-1.5 bg-[#868ca0]">
                  <div
                    className="h-full bg-[#e0794f]"
                    style={{ width: `${gameBarWidth}%` }}
                  />
                </div>
              </div>

              {/* Win rate */}
              <div className="col-span-4 text-sm">
                <span className="block mb-1">{m.winRate}%</span>
                <div className="w-1/2 h-1.5 bg-[#868ca0]">
                  <div
                    className="h-full bg-[#01df90]"
                    style={{ width: `${winBarWidth}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchupsTable;
