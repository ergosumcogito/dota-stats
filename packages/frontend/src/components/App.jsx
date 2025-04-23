import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [topHeroes, setTopHeroes] = useState([]);

    useEffect(() => {
        fetch('https://api.opendota.com/api/heroStats')
            .then((response) => response.json())
            .then((data) => {
                // Calculate winrate and sort by winrate
                const sortedHeroes = data
                    .map((hero) => ({
                        ...hero,
                        winrate: hero.pro_win && hero.pro_pick ? hero.pro_win / hero.pro_pick : 0,
                    }))
                    .filter((hero) => hero.pro_pick > 10) // filter out low pick heroes
                    .sort((a, b) => b.winrate - a.winrate)
                    .slice(0, 10); // top 10

                setTopHeroes(sortedHeroes);
            })
            .catch((error) => console.error('Error fetching hero stats:', error));
    }, []);

    return (
        <div className="App bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Top 10 Heroes by Winrate</h1>
            <ul className="w-full max-w-4xl space-y-4">
                {topHeroes.map((hero) => (
                    <li
                        key={hero.id}
                        className="flex items-center odd:bg-gray-700 even:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300 hover:bg-slate-500 hover:scale-105 transform"
                    >
                        <img
                            src={`https://dotabase.dillerm.io/vpk/panorama/images/heroes/icons/${hero.name}_png.png`}
                            alt={hero.localized_name}
                            className="hero-img w-12 h-12 mr-4 rounded-full"
                        />
                        <span className="text-lg font-medium">{hero.localized_name} - {(hero.winrate * 100).toFixed(2)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
