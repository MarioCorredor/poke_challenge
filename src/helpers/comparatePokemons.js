export const comparatePokemons = (dailyPokemon, pokemon) => {
	if (!dailyPokemon || !pokemon) return null;

	return {
		name: dailyPokemon.name === pokemon.name,
		type1: dailyPokemon.types?.[0] === pokemon.types?.[0],
		type2: dailyPokemon.types?.[1] === pokemon.types?.[1],
		ability: dailyPokemon.abilities?.[0] === pokemon.abilities?.[0],
		mainColor: dailyPokemon.main_color === pokemon.main_color,
		highestStat:
			dailyPokemon.stats?.[0]?.stat.name ===
			pokemon.stats?.[0]?.stat.name,
		generation: dailyPokemon.generation === pokemon.generation,
		captureRate: dailyPokemon.capture_rate === pokemon.capture_rate,
		habitat: dailyPokemon.habitat === pokemon.habitat,
		height: dailyPokemon.height === pokemon.height,
		weight: dailyPokemon.weight === pokemon.weight,
	};
};
