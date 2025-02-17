export const getAllPokemonNames = async () => {
    try {
        const response = await fetch("https://poke-backend-p5w5.onrender.com/pokemons");
        if (!response.ok) throw new Error("Failed to fetch Pokémon data");
        const data = await response.json();
        return data?.map(pokemon => pokemon.name) || [];
    } catch (error) {
        console.error("Error fetching Pokémon names:", error);
        return [];
    }
};
