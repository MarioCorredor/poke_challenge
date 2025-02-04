export const getPokemonImage = async (name) => {
    try {
        const response = await fetch(`https://poke-backend-tvv2.onrender.com/pokemons/name/${name}`);
        if (!response.ok) throw new Error("Error fetching Pokémon data");
        
        const data = await response.json();
        return data[0].sprites?.front_default || null;
    } catch (error) {
        console.error("Error fetching Pokémon image:", error);
        return null;
    }
};
