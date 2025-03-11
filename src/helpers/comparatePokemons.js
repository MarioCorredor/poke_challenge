export const comparePokemonAttributes = (pokemon, dailyPokemon) => {
	if (!dailyPokemon || !pokemon) return null;

	console.log(pokemon)
	console.log(dailyPokemon)

	const compareNumeric = (a, b) =>
		a > b ? "greater" : a < b ? "less" : "equal";

	return {
		name: dailyPokemon.name === pokemon.name,
		type1: dailyPokemon.types?.[0] === pokemon.types?.[0],
		type2: dailyPokemon.types?.[1] === pokemon.types?.[1],
		type1Crossed: dailyPokemon.types?.[1] === pokemon.types?.[0],
		type2Crossed: dailyPokemon.types?.[0] === pokemon.types?.[1],
		ability: dailyPokemon.abilities?.[0] === pokemon.abilities?.[0],
		mainColor: dailyPokemon.main_color === pokemon.main_color,
		highestStat: dailyPokemon.highestStat === pokemon.highestStat,
		generation: compareNumeric(dailyPokemon.generation, pokemon.generation),
		captureRate: compareNumeric(
			dailyPokemon.capture_rate,
			pokemon.capture_rate
		),
		habitat: dailyPokemon.habitat === pokemon.habitat,
		height: compareNumeric(dailyPokemon.height, pokemon.height),
		weight: compareNumeric(dailyPokemon.weight, pokemon.weight),
		evolution_stage: compareNumeric(dailyPokemon.evolution_stage, pokemon.evolution_stage),
		evolution_trigger:
		dailyPokemon.evolution_trigger === pokemon.evolution_trigger,
	};
};
