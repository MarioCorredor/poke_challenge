import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks";
import { getPokemon } from "../../../helpers";
import { PokemonTable, SearchBar } from "..";
import { usePokemon } from "../../../contexts";

export const ClassicGame = () => {
	const { dailyPokemons } = usePokemon();
	const [ dailyPokemon, setDailyPokemon ] = useState({});

	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		if (dailyPokemons.length < 1) return;
		setDailyPokemon(dailyPokemons[0]);
	}, [dailyPokemons]);

	const handleSelectPokemon = async (name) => {
		if (!name) return;

		const pokemonData = await getPokemon(name);
		if (pokemonData) {
			setPokemons((prev) => [...prev, ...pokemonData.flat()]);
		}
	};

	return (
		<>
			<>
				<div className="flex justify-self-center w-[800px]">
					<PokemonTable pokemons={pokemons} />
				</div>
				<div className="flex justify-self-center">
					<SearchBar onSelectPokemon={handleSelectPokemon} />
				</div>
			</>
		</>
	);
};
