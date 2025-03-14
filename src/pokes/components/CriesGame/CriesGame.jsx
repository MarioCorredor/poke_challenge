import React, { useEffect, useRef, useState } from "react";
import { CustomAudioPlayer } from "../CustomComponents";
import { usePokemon } from "../../../contexts";
import {
	SearchBar,
	PokemonListCard,
	HintsCard,
	NextGameCard,
} from "../elements";
import {
	decryptData,
	encryptData,
	getCountdown,
	getPokemon,
} from "../../../helpers";

import "./CriesGame.css";

export const CriesGame = () => {
	const {
		dailyPokemons,
		yesterdayPokemons,
		isCriesPokemonGuessed,
		setIsCriesPokemonGuessed,
	} = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});
	const [yesterdayPokemon, setYesterdayPokemon] = useState({});

	const [timeLeft, setTimeLeft] = useState("");

	const [pokemons, setPokemons] = useState(
		JSON.parse(localStorage.getItem("criesPokemons")) || []
	);

	const guessedRef = useRef(null);

	useEffect(() => {
		const clearCountdown = getCountdown(setTimeLeft);
		return () => clearCountdown();
	}, []);

	useEffect(() => {
		const storedYesterdayPokemon = decryptData(
			localStorage.getItem("yesterdayCriesPokemon")
		);

		if (yesterdayPokemons.length > 0) {
			const yesterdayDailyPokemon = yesterdayPokemons[1];

			if (
				!storedYesterdayPokemon ||
				storedYesterdayPokemon.id !== yesterdayDailyPokemon.id
			) {
				localStorage.setItem(
					"yesterdayCriesPokemon",
					encryptData(yesterdayDailyPokemon)
				);
			}

			setYesterdayPokemon(yesterdayDailyPokemon);
		}
	}, [yesterdayPokemons]);

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
			}

			setDailyPokemon(newDailyPokemon);
			setIsCriesPokemonGuessed(false);
		}
	}, [dailyPokemons]);

	useEffect(() => {
		if (isCriesPokemonGuessed && guessedRef.current) {
			guessedRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [isCriesPokemonGuessed]);

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
				<HintsCard attempts={pokemons.length} dailyPokemon={dailyPokemon} />
			</div>
			{!isCriesPokemonGuessed && (
				<div className="flex justify-self-center mb-3">
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
			{isCriesPokemonGuessed && Object.keys(dailyPokemon).length > 0 && (
				<div className="border-4 border-gray-200 rounded-lg inner-container p-4 flex gap-8 max-w-[950px] justify-self-center mb-3" ref={guessedRef}>
					<div className="w-1/2 flex flex-col p-3 border-3 border-[#2C6344] rounded-tr-3xl rounded-br-3xl rounded-tl-lg rounded-bl-lg  bg-[#5ECD8E] animate__animated animate__tada inner-border">
						<p className="mb-2 text-white text-shadow">Gotcha!</p>
						<div className="flex gap-6">
							<div className="border-4 border-[#333333] rounded-2xl bg-grid-white flex justify-center items-center p-2">
								<img
									src={
										dailyPokemon.sprites?.front_default ||
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
											yesterdayPokemon.name.length > 5
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
						<p className="text-white !text-lg">Next pokémon in:</p>
						<div className="my-2 flex gap-4">
							<p className="!text-[16px]">{timeLeft}</p>
							<p className="text-gray-400 !text-[8px] self-center pt-2">
								Time zone: Europe (00:00 UTC+2)
							</p>
						</div>
						<NextGameCard mode={2} />
					</div>
				</div>
			)}
		</>
	);
};
