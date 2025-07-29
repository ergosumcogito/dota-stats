import React, { useEffect, useState } from 'react';

const HeroMatrixPage = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHeroes = async () => {
        const response = await fetch('https://api.opendota.com/api/constants/heroes');
        const data = await response.json();
        return Object.values(data);
    };

    useEffect(() => {
        const loadHeroes = async () => {
            try {
                const data = await fetchHeroes();
                setHeroes(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching heroes:', err);
            }
        };

        loadHeroes();
    }, []);

    const getImageUrl = (name) =>
        `https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/${name.replace('npc_dota_hero_', '')}.png`;

    const groupByAttribute = (attribute) =>
        heroes.filter((hero) =>
            attribute === 'all' ? hero.primary_attr === 'all' : hero.primary_attr === attribute
        );

    if (loading) {
        return <div className="text-center p-4">Loading heroes...</div>;
    }

    const attributes = [
        { key: 'str', label: 'Strength' },
        { key: 'agi', label: 'Agility' },
        { key: 'int', label: 'Intelligence' },
        { key: 'all', label: 'Universal' }
    ];

    return (
        <div className="mx-15 p-4 grid grid-cols-2 gap-4">
            {attributes.map((attr) => (
                <div key={attr.key} className="p-2">
                    <h2 className="text-xl font-bold mb-2 text-center">{attr.label}</h2>
                    <div className="flex flex-wrap gap-2 justify-start">
                        {groupByAttribute(attr.key).map((hero) => (
                            <a
                                key={hero.id}
                                href={`/hero?id=${hero.id}`}
                                className="hover:scale-120 transition-transform"
                            >
                                <img
                                    src={getImageUrl(hero.name)}
                                    alt={hero.localized_name}
                                    className="w-auto h-auto md:max-h-[40px] lg:max-h-[50px]"
                                    title={hero.localized_name}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeroMatrixPage;
