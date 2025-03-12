import React, { useEffect, useState } from "react";
import { CustomAudioPlayer } from "../CustomComponents";
import { usePokemon } from "../../../contexts";
import { SearchBar, PokemonListCard, HintsCard } from "../elements";
import { decryptData, encryptData, getPokemon } from "../../../helpers";

export const CriesGame = () => {
	const { dailyPokemons, isCriesPokemonGuessed, setIsCriesPokemonGuessed } =
		usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});

	const [pokemons, setPokemons] = useState(
		JSON.parse(localStorage.getItem("criesPokemons")) || []
	);

	const [attempts, setAttempts] = useState(() => {
		const savedAttempts = localStorage.getItem("attempts");
		return savedAttempts ? JSON.parse(savedAttempts) : 0;
	});

	useEffect(() => {
		const storedDailyPokemon = decryptData(
			localStorage.getItem("dailyCriesPokemon")
		);

		if (dailyPokemons.length > 1) {
			const newDailyPokemon = dailyPokemons[1];

			if (
				!storedDailyPokemon ||
				storedDailyPokemon.id !== newDailyPokemon.id
			) {
				localStorage.setItem(
					"dailyCriesPokemon",
					encryptData(newDailyPokemon)
				);
				localStorage.removeItem("criesPokemons");
				setPokemons([]);
				setAttempts(0); // Reset attempts for new dailyPokemon
				localStorage.setItem("attempts", JSON.stringify(0));
			}

			setDailyPokemon(newDailyPokemon);
			setIsCriesPokemonGuessed(false);
		}
	}, [dailyPokemons]);

	useEffect(() => {
		// Save attempts to localStorage whenever it changes
		localStorage.setItem("attempts", JSON.stringify(attempts));
	}, [attempts]);

	const saveToLocalStorage = (newPokemons) => {
		localStorage.setItem("criesPokemons", JSON.stringify(newPokemons));
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
			setAttempts((prevAttempts) => prevAttempts + 1); // Increment attempts
		}
	};

	return (
		<>
			<div className="flex justify-center w-full mb-5">
				<div className="flex justify-center w-[800px]">
					<CustomAudioPlayer src={dailyPokemon.cries?.latest} />
				</div>
			</div>
			<div className="flex justify-center w-full mb-5">
				<HintsCard attempts={attempts} dailyPokemon={dailyPokemon}/>
			</div>
			{!isCriesPokemonGuessed && (
				<div className="flex justify-self-center">
					<SearchBar
						onSelectPokemon={handleSelectPokemon}
						selectedPokemons={pokemons.map((p) => p.name)}
					/>
				</div>
			)}
			{pokemons.length > 0 && (
				<div className="flex justify-self-center justify-center flex-col w-[800px]">
					{pokemons
						.map((pokemon) => (
							<div
								className="flex justify-center mt-3"
								key={pokemon.id}>
								<PokemonListCard
									pokemon={pokemon}
									dailyPokemon={dailyPokemon}
								/>
							</div>
						))
						.reverse()}
				</div>
			)}
		</>
	);
};