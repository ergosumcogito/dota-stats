const API_URL = 'https://api.opendota.com/api/constants/game_mode';

const getGameModes = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch game modes');
    }
    const data = await response.json();
    const map = {};
    Object.values(data).forEach(mode => {
        const name = mode.name.replace('game_mode_', '').replaceAll('_', ' ');
        map[mode.id] = name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    });
    return map;
};

export default {
    getGameModes,
};
