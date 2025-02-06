export const comparateNames = (pokemon, dailyPokemon) => {
	if (!dailyPokemon || !pokemon) return null;

	return {
		name: dailyPokemon.name === pokemon.name
	}
	
};
