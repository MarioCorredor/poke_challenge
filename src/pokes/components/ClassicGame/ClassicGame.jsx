import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks";
import { getPokemon } from "../../../helpers";
import { PokemonTable, SearchBar } from "..";
import { usePokemon } from "../../../contexts";

export const ClassicGame = () => {
	const {
		dailyPokemons,
		isClassicPokemonGuessed,
		setIsClassicPokemonGuessed,
	} = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});

	const [pokemons, setPokemons] = useState(
		JSON.parse(localStorage.getItem("classicPokemons")) || []
	);

	useEffect(() => {
		const storedDailyPokemon = JSON.parse(
			localStorage.getItem("dailyClassicPokemon")
		);

		if (dailyPokemons.length > 0) {
			const newDailyPokemon = dailyPokemons[0];

			if (
				!storedDailyPokemon ||
				storedDailyPokemon.id !== newDailyPokemon.id
			) {
				localStorage.setItem(
					"dailyClassicPokemon",
					JSON.stringify(newDailyPokemon)
				);
				localStorage.removeItem("classicPokemons");
				setPokemons([]);
			}

			setDailyPokemon(newDailyPokemon);
			setIsClassicPokemonGuessed(false);
		}
	}, [dailyPokemons]);

	const saveToLocalStorage = (newPokemons) => {
		localStorage.setItem("classicPokemons", JSON.stringify(newPokemons));
	};

	const handleSelectPokemon = async (name) => {
		if (!name) return;

		const pokemonData = await getPokemon(name);
		if (pokemonData) {
			const newPokemons = [...pokemons, ...pokemonData.flat()].filter(
				(p, index, self) =>
					index === self.findIndex((t) => t.id === p.id)
			);

			setPokemons(newPokemons);
			saveToLocalStorage(newPokemons);
		}
	};

	return (
		<>
			{!isClassicPokemonGuessed && (
				<div className="flex justify-self-center mb-5">
					<SearchBar
						onSelectPokemon={handleSelectPokemon}
						selectedPokemons={pokemons.map((p) => p.name)}
					/>
				</div>
			)}
			<div className="flex justify-self-center w-[800px]">
				<PokemonTable pokemons={pokemons} />
			</div>
		</>
	);
};
