import React, { useEffect, useState } from "react";
import { CustomAudioPlayer } from "../CustomComponents";
import { usePokemon } from "../../../contexts";
import { SearchBar, PokemonListCard } from "../elements";
import { getPokemon } from "../../../helpers";

export const CriesGame = () => {
	const { dailyPokemons } = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});

	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		if (dailyPokemons.length < 1) return;
		setDailyPokemon(dailyPokemons[1]);
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
			<div className="flex justify-center w-full mb-5">
				<div className="flex justify-center w-[800px]">
					<CustomAudioPlayer src={dailyPokemon.cries?.latest} />
				</div>
			</div>
			<div className="flex justify-self-center">
				<SearchBar onSelectPokemon={handleSelectPokemon} />
			</div>
			{pokemons.length === 0 ? (
				<></>
			) : (
				<div className="flex justify-self-center justify-center flex-col w-[800px]">
					{pokemons.map((pokemon) => (
						<div className="flex justify-center mt-3"  key={pokemon.id}>
							<PokemonListCard pokemon={pokemon} dailyPokemon={dailyPokemon}/>
						</div>
					)).reverse()}
				</div>
			)}
		</>
	);
};
