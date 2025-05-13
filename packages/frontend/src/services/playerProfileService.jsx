const fetchPlayerHeaderData = async (playerId) => {
    try {
        const response = await fetch(`https://api.opendota.com/api/players/${playerId}`);
        if (!response.ok) {
            throw new Error('Player not found');
        }
        const data = await response.json();

        if(!data.profile){
            throw new Error('Player profile is incomplete');
        }

        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching player');
    }
};

export default { fetchPlayerHeaderData };