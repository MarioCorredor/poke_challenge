import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks";
import { PokemonRow } from "../elements/PokemonRow";
import { CustomAudioPlayer } from "../CustomComponents/CustomAudioPlayer";
import { usePokemon } from "../../../contexts";

export const CriesGame = (pokemons = []) => {
	const { dailyPokemons } = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});

	useEffect(() => {
		if (dailyPokemons.length < 1) return;
		setDailyPokemon(dailyPokemons[1]);
	}, [dailyPokemons]);

	return (
		<>
			<div>
				<CustomAudioPlayer src={dailyPokemon.cries?.latest} />
			</div>
		</>
	);
};
