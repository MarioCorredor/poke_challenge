import React, { useEffect, useState } from "react";
import { usePokemon } from "../../../contexts";
import { PokemonListCard, SearchBar } from "..";
import { getPokemon } from "../../../helpers";

export const SilouetteGame = () => {
	const { dailyPokemons } = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});

	const [pokemons, setPokemons] = useState(
		JSON.parse(localStorage.getItem("silouettePokemons")) || []
	);

	const [blurIntensity, setBlurIntensity] = useState(5);
	const [zoomLevel, setZoomLevel] = useState(3.9);
	const [transformOrigin, setTransformOrigin] = useState("center center");

	useEffect(() => {
		const storedDailyPokemon = JSON.parse(
			localStorage.getItem("dailySilouettePokemon")
		);

		if (dailyPokemons.length > 2) {
			const newDailyPokemon = dailyPokemons[2];

			if (
				!storedDailyPokemon ||
				storedDailyPokemon.id !== newDailyPokemon.id
			) {
				localStorage.setItem(
					"dailySilouettePokemon",
					JSON.stringify(newDailyPokemon)
				);
				localStorage.removeItem("silouettePokemons");
				setPokemons([]);
			}

			setDailyPokemon(newDailyPokemon);
		}

		const randomX = 30 + Math.random() * 40;
		const randomY = 30 + Math.random() * 40;
		setTransformOrigin(`${randomX}% ${randomY}%`);
	}, [dailyPokemons]);

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

			setBlurIntensity((prev) => Math.max(prev - 0.5, 2));
			setZoomLevel((prev) => Math.max(prev - 0.3, 2));
		}
	};

	const saveToLocalStorage = (newPokemons) => {
		localStorage.setItem("silouettePokemons", JSON.stringify(newPokemons));
	};

	return (
		<>
			{dailyPokemon !== null ? (
				<>
					<div>
						<div className="flex justify-self-center flex-col justify-center w-[500px] border-2 rounded-lg mt-2">
							<p className="text-center mt-2">
								Who is this pokemon?
							</p>
							<p className="text-center mt-1 text-gray-400">
								This pokémon is shiny
							</p>
							<div className="flex justify-center w-full h-full my-5">
								<div className="flex justify-center w-[400px] h-[400px] overflow-hidden border-2">
									<img
										src={dailyPokemon.sprites?.front_shiny}
										className="w-full h-full"
										style={{
											filter: `blur(${blurIntensity}px)`,
											transform: `scale(${zoomLevel})`,
											transformOrigin: transformOrigin,
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-self-center mt-5">
						<SearchBar
							onSelectPokemon={handleSelectPokemon}
							selectedPokemons={pokemons.map((p) => p.name)}
						/>
					</div>
					{pokemons.length === 0 ? (
						<></>
					) : (
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
			) : (
				<div className="flex justify-center">
					<img
						src="/pokeball.svg"
						className="animate-spin mx-auto"
						width="32"
						height="32"
					/>
				</div>
			)}
		</>
	);
};
