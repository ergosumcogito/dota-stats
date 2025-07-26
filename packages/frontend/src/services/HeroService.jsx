let heroesCache = null;

const fetchHeroes = async () => {
    if (heroesCache) return heroesCache;

    const response = await fetch('https://api.opendota.com/api/constants/heroes');
    if (!response.ok) throw new Error('Failed to fetch heroes');

    const data = await response.json();

    heroesCache = Object.values(data);
    return heroesCache;
};

const getHeroImageById = async (heroId) => {
    const heroes = await fetchHeroes();
    const hero = heroes.find(h => h.id === +heroId);
    if (!hero) return null;

    const name = hero.name.replace('npc_dota_hero_', '');
    return `https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/${name}_full.png`;
};

const getHeroMiniIconById = async (heroId) => {
    const heroes = await fetchHeroes();
    const hero = heroes.find(h => h.id === +heroId);
    if (!hero) return null;

    const name = hero.name.replace('npc_dota_hero_', '');
    return `https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/${name}.png`;
};


export default { fetchHeroes, getHeroImageById, getHeroMiniIconById };
