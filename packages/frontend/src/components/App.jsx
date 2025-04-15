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
      <div className="App">
        <h1>Top 10 Heroes by Winrate</h1>
        <ul>
          {topHeroes.map((hero) => (
              <li key={hero.id}>
                  <img
                      src={`https://dotabase.dillerm.io/vpk/panorama/images/heroes/icons/${hero.name}_png.png`}
                      alt={hero.localized_name}
                      className="hero-img"
                  />
                  <span>{hero.localized_name} - {(hero.winrate * 100).toFixed(2)}%</span>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
