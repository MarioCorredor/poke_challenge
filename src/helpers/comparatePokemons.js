export const comparePokemonAttributes = (pokemon, dailyPokemon) => {
	if (!dailyPokemon || !pokemon) return null;

	const compareNumeric = (a, b) =>
		a > b ? "greater" : a < b ? "less" : "equal";

	return {
		name: dailyPokemon.name === pokemon.name,
		type1: dailyPokemon.types?.[0] === pokemon.types?.[0],
		type2: dailyPokemon.types?.[1] === pokemon.types?.[1],
		// Detectar si los tipos están cruzados, pero separados
		type1Crossed: dailyPokemon.types?.[0] === pokemon.types?.[1],
		type2Crossed: dailyPokemon.types?.[1] === pokemon.types?.[0],
		ability: dailyPokemon.abilities?.[0] === pokemon.abilities?.[0],
		mainColor: dailyPokemon.main_color === pokemon.main_color,
		highestStat: dailyPokemon.highestStat === pokemon.highestStat,
		generation: compareNumeric(pokemon.generation, dailyPokemon.generation),
		captureRate: compareNumeric(
			pokemon.capture_rate,
			dailyPokemon.capture_rate
		),
		habitat: dailyPokemon.habitat === pokemon.habitat,
		height: compareNumeric(pokemon.height, dailyPokemon.height),
		weight: compareNumeric(pokemon.weight, dailyPokemon.weight),
		evolutionStage: compareNumeric(pokemon.evolutionStage, dailyPokemon.evolutionStage),
		evolutionTrigger:
		dailyPokemon.evolutionTrigger === pokemon.evolutionTrigger,
	};
};
