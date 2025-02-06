import React, { useEffect, useState } from "react";
import { usePokemon } from "../../../contexts";
import { PokemonListCard, SearchBar } from "..";
import { getPokemon } from "../../../helpers";

export const SilouetteGame = () => {
	const { dailyPokemons } = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});

	const [pokemons, setPokemons] = useState([]);

	const [blurIntensity, setBlurIntensity] = useState(5);
	const [zoomLevel, setZoomLevel] = useState(3.9); // Zoom inicial
	const [transformOrigin, setTransformOrigin] = useState("center center");

	useEffect(() => {
		if (dailyPokemons.length < 1) return;
		setDailyPokemon(dailyPokemons[2]);

		// Al cargar la imagen, elegimos un punto aleatorio de enfoque
		const randomX = 30 + Math.random() * 40; // Entre 30% y 70%
		const randomY = 30 + Math.random() * 40; // Entre 30% y 70%
		setTransformOrigin(`${randomX}% ${randomY}%`);
	}, [dailyPokemons]);

	const handleSelectPokemon = async (name) => {
		if (!name) return;

		const pokemonData = await getPokemon(name);
		if (pokemonData) {
			setPokemons((prev) => [...prev, ...pokemonData.flat()]);

			setBlurIntensity((prev) => Math.max(prev - 0.5, 2));
			setZoomLevel((prev) => Math.max(prev - 0.30, 2));
		}
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
						<SearchBar onSelectPokemon={handleSelectPokemon} />
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
