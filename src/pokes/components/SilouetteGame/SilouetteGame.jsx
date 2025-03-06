import React, { useEffect, useState } from "react";
import { usePokemon } from "../../../contexts";
import { PokemonListCard, SearchBar } from "..";
import { decryptData, encryptData, getPokemon } from "../../../helpers";
import "./SilouetteGame.css";

export const SilouetteGame = () => {
	const {
		dailyPokemons,
		isSilouettePokemonGuessed,
		setIsSilouettePokemonGuessed,
	} = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});
	const [pokemons, setPokemons] = useState(
		JSON.parse(localStorage.getItem("silouettePokemons")) || []
	);

	const [blurIntensity, setBlurIntensity] = useState(5);
	const [zoomLevel, setZoomLevel] = useState(3.9);
	const [transformOrigin, setTransformOrigin] = useState("center center");

	useEffect(() => {
		const storedDailyPokemon = decryptData(
			localStorage.getItem("dailySilouettePokemon")
		);

		if (dailyPokemons.length > 2) {
			const newDailyPokemon = dailyPokemons[2];
			setDailyPokemon(newDailyPokemon);

			if (
				!storedDailyPokemon ||
				storedDailyPokemon.id !== newDailyPokemon.id
			) {
				localStorage.setItem(
					"dailySilouettePokemon",
					encryptData(newDailyPokemon)
				);
				localStorage.removeItem("silouettePokemons");
				localStorage.removeItem("silouetteSeed");
				localStorage.removeItem("silouetteAttempts");
				localStorage.removeItem("silouetteGuessed"); // Resetear cuando cambie el Pokémon
				setPokemons([]);
			}

			setIsSilouettePokemonGuessed(false);

			let seed = JSON.parse(localStorage.getItem("silouetteSeed"));
			if (!seed || seed.id !== newDailyPokemon.id) {
				seed = {
					id: newDailyPokemon.id,
					randomX: 30 + Math.random() * 40,
					randomY: 30 + Math.random() * 40,
					initialBlur: 5,
					initialZoom: 3.9,
				};
				localStorage.setItem("silouetteSeed", JSON.stringify(seed));
			}

			setTransformOrigin(`${seed.randomX}% ${seed.randomY}%`);

			// Verificar si el usuario ya adivinó el Pokémon
			const guessed = localStorage.getItem("silouetteGuessed") === "true";
			if (guessed) {
				setBlurIntensity(0);
				setZoomLevel(1);
				setIsSilouettePokemonGuessed(true);
			} else {
				const storedAttempts =
					JSON.parse(localStorage.getItem("silouetteAttempts")) || 0;
				setBlurIntensity(
					Math.max(seed.initialBlur - storedAttempts * 0.5, 2)
				);
				setZoomLevel(
					Math.max(seed.initialZoom - storedAttempts * 0.3, 2)
				);
			}
		}
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

			// Si el Pokémon seleccionado es el correcto
			if (pokemonData.some((p) => p.id === dailyPokemon.id)) {
				setBlurIntensity(0);
				setZoomLevel(1); // O 1 si quieres el tamaño normal
				localStorage.setItem("silouetteGuessed", "true"); // Guardar que ya ha sido adivinado
				setIsSilouettePokemonGuessed(true);
			} else {
				// Incrementar intentos y reducir blur/zoom si sigue fallando
				const newAttempts =
					(JSON.parse(localStorage.getItem("silouetteAttempts")) ||
						0) + 1;
				localStorage.setItem(
					"silouetteAttempts",
					JSON.stringify(newAttempts)
				);

				setBlurIntensity((prev) => Math.max(prev - 0.5, 2));
				setZoomLevel((prev) => Math.max(prev - 0.3, 2));
			}
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
						<div className="flex justify-self-center flex-col justify-center w-[450px] border-2 rounded-lg mt-2 bg-white">
							<p className="text-center mt-2">
								Who is this pokemon?
							</p>
							<p className="text-center mt-1 text-gray-400">
								This pokémon is shiny
							</p>
							<div className="flex justify-center w-full h-full my-5">
								<div className="flex justify-center w-[400px] h-[400px] overflow-hidden border-2 bg-grid">
									<img
										src={dailyPokemon.sprites?.front_shiny}
										className="w-full h-full"
										style={{
											filter: `blur(${blurIntensity}px)`,
											transform: `scale(${zoomLevel})`,
											transformOrigin: transformOrigin,
											userSelect: "none",
											pointerEvents: "none",
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					{!isSilouettePokemonGuessed && (
						<div className="flex justify-self-center mt-5">
							<SearchBar
								onSelectPokemon={handleSelectPokemon}
								selectedPokemons={pokemons.map((p) => p.name)}
							/>
						</div>
					)}
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
						src="/pokeball.png"
						className="animate-spin mx-auto"
						width="32"
						height="32"
					/>
				</div>
			)}
		</>
	);
};
