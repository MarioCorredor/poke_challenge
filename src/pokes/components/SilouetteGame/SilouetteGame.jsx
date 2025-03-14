import React, { useEffect, useRef, useState } from "react";
import { usePokemon } from "../../../contexts";
import { NextGameCard, PokemonListCard, SearchBar } from "..";
import {
	decryptData,
	encryptData,
	getCountdown,
	getPokemon,
} from "../../../helpers";
import "./SilouetteGame.css";

export const SilouetteGame = () => {
	const {
		dailyPokemons,
		yesterdayPokemons,
		isSilouettePokemonGuessed,
		setIsSilouettePokemonGuessed,
	} = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});
	const [yesterdayPokemon, setYesterdayPokemon] = useState({});

	const [timeLeft, setTimeLeft] = useState("");
	const [pokemons, setPokemons] = useState(
		JSON.parse(localStorage.getItem("silouettePokemons")) || []
	);

	const guessedRefCont = useRef(null);

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

	useEffect(() => {
		if (isSilouettePokemonGuessed && guessedRefCont.current) {
			guessedRefCont.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [isSilouettePokemonGuessed]);

	useEffect(() => {
		const storedYesterdayPokemon = decryptData(
			localStorage.getItem("yesterdaySilouettePokemon")
		);

		if (yesterdayPokemons.length > 0) {
			const yesterdayDailyPokemon = yesterdayPokemons[2];

			if (
				!storedYesterdayPokemon ||
				storedYesterdayPokemon.id !== yesterdayDailyPokemon.id
			) {
				localStorage.setItem(
					"yesterdaySilouettePokemon",
					encryptData(yesterdayDailyPokemon)
				);
			}

			setYesterdayPokemon(yesterdayDailyPokemon);
		}
	}, [yesterdayPokemons]);

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

	useEffect(() => {
		const clearCountdown = getCountdown(setTimeLeft);
		return () => clearCountdown();
	}, []);

	const saveToLocalStorage = (newPokemons) => {
		localStorage.setItem("silouettePokemons", JSON.stringify(newPokemons));
	};

	return (
		<>
			{dailyPokemon !== null ? (
				<>
					<div>
						<div className="flex justify-self-center flex-col justify-center w-[450px] border-2 rounded-lg mt-2 bg-white mb-3">
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
						<div className="flex justify-self-center mt-2 mb-3">
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
										className="flex justify-center mb-3"
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
			{isSilouettePokemonGuessed &&
				Object.keys(dailyPokemon).length > 0 && (
					<div
						className="border-4 border-gray-200 rounded-lg inner-container p-4 flex gap-8 max-w-[950px] justify-self-center mb-4"
						ref={guessedRefCont}>
						<div className="w-1/2 flex flex-col p-3 border-3 border-[#2C6344] rounded-tr-3xl rounded-br-3xl rounded-tl-lg rounded-bl-lg  bg-[#5ECD8E] animate__animated animate__tada inner-border">
							<p className="mb-2 text-white text-shadow">
								Gotcha!
							</p>
							<div className="flex gap-6">
								<div className="border-4 border-[#333333] rounded-2xl bg-grid-white flex justify-center items-center p-2">
									<img
										src={
											dailyPokemon.sprites
												?.front_default ||
											"/pokeball.png"
										}
										height="96"
										width="96"
									/>
								</div>
								<div className="flex flex-col">
									<div className="flex flex-col">
										<p
											className={`capitalize text-[#333333] text-shadow pokemon-name ${
												dailyPokemon.name.length > 10
													? "long"
													: ""
											}`}>
											{dailyPokemon.name}
										</p>
										<p className="capitalize pb-1 text-[#333333]">
											#{dailyPokemon.speciesId}
										</p>
										<p className="text-[#42855F] pb-4 text-shadow">
											Attempts: {pokemons.length}
										</p>
										<p className="text-gray-500 pb-2 !text-[10px] text-shadow">
											Yesterday pokémon was:
										</p>
										<p
											className={`capitalize text-[#333333] text-shadow pokemon-name ${
												yesterdayPokemon.name.length >
												5
													? "long"
													: ""
											}`}>
											{yesterdayPokemon.name}
										</p>
										<p className="capitalize text-gray-500 text-shadow">
											#{yesterdayPokemon.speciesId}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="w-1/2 text-white flex px-4 pt-4 flex-col text-shadow">
							<p className="text-white !text-lg">
								Next pokémon in:
							</p>
							<div className="my-2 flex gap-4">
								<p className="!text-[16px]">{timeLeft}</p>
								<p className="text-gray-400 !text-[8px] self-center pt-2">
									Time zone: Europe (00:00 UTC+2)
								</p>
							</div>
							<NextGameCard mode={0} />
						</div>
					</div>
				)}
		</>
	);
};
