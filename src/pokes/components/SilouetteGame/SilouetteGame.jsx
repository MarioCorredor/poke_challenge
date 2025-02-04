import React, { useEffect, useState } from "react";
import { PokemonRow } from "../elements/PokemonRow";
import { usePokemon } from "../../../contexts";

export const SilouetteGame = (pokemons = []) => {
	const { dailyPokemons } = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});

	useEffect(() => {
		if (dailyPokemons.length < 1) return;
		setDailyPokemon(dailyPokemons[2]);
	}, [dailyPokemons]);

	return (
		<>
			<PokemonRow pokemon={dailyPokemon?.pokemon} />
		</>
	);
};
