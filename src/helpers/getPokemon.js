export const getPokemon = async (name) => {
    try {
        const response = await fetch(`https://poke-backend-tvv2.onrender.com/pokemons/name/${name}`);
        if (!response.ok) {
            throw new Error(`Error fetching Pokémon: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
        return null;
    }
};
