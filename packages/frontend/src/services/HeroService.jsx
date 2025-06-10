let heroesCache = null;

const fetchHeroes = async () => {
    if (heroesCache) return heroesCache;

    const response = await fetch('https://api.opendota.com/api/heroes');
    if (!response.ok) throw new Error('Failed to fetch heroes');

    heroesCache = await response.json();
    return heroesCache;
};

const getHeroImageById = async (heroId) => {
    const heroes = await fetchHeroes();
    const hero = heroes.find(h => h.id === +heroId);
    if (!hero) return null;

    return `https://api.opendota.com${hero.img}`;
};

export default { fetchHeroes, getHeroImageById };
