import React, { useEffect, useState } from "react";
import {
	getPokemon,
	getCountdown,
	decryptData,
	encryptData,
} from "../../../helpers";
import { PokemonTable, SearchBar } from "..";
import { usePokemon } from "../../../contexts";
import { NextGameCard } from "../elements";
import "./ClassicGame.css";
import "animate.css";

export const ClassicGame = () => {
	const {
		dailyPokemons,
		yesterdayPokemons,
		isClassicPokemonGuessed,
		setIsClassicPokemonGuessed,
	} = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});
	const [yesterdayPokemon, setYesterdayPokemon] = useState({});

	const [timeLeft, setTimeLeft] = useState("");

	const [pokemons, setPokemons] = useState(
		JSON.parse(localStorage.getItem("classicPokemons")) || []
	);

	useEffect(() => {
		const storedYesterdayPokemon = decryptData(
			localStorage.getItem("yesterdayClassicPokemon")
		);

		if (yesterdayPokemons.length > 0) {
			const yesterdayDailyPokemon = yesterdayPokemons[0];

			if (
				!storedYesterdayPokemon ||
				storedYesterdayPokemon.id !== yesterdayDailyPokemon.id
			) {
				localStorage.setItem(
					"yesterdayClassicPokemon",
					encryptData(yesterdayDailyPokemon)
				);
			}

			setYesterdayPokemon(yesterdayDailyPokemon);
		}
	}, [yesterdayPokemons]);

	useEffect(() => {
		const storedDailyPokemon = decryptData(
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
					encryptData(newDailyPokemon)
				);
				localStorage.removeItem("classicPokemons");
				setPokemons([]);
			}

			setDailyPokemon(newDailyPokemon);
			setIsClassicPokemonGuessed(false);
		}
	}, [dailyPokemons]);

	useEffect(() => {
		const clearCountdown = getCountdown(setTimeLeft);
		return () => clearCountdown();
	}, []);

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
			<div className="flex flex-col items-center w-full">
				<div className="flex outer-container w-[950px] justify-center py-2 border-2 rounded">
					<div>
						<div className="flex justify-center gap-6 py-2">
							<div className="rounded-md w-[20px] h-[20px] bg-gray-300"></div>
							<div className="rounded-md w-[20px] h-[20px] bg-gray-300"></div>
							<div className="rounded-md w-[20px] h-[20px] bg-gray-300"></div>
							<div className="rounded-md w-[20px] h-[20px] bg-gray-300"></div>
						</div>
						{!isClassicPokemonGuessed && (
							<div className="mb-2 w-full flex justify-center">
								<SearchBar
									onSelectPokemon={handleSelectPokemon}
									selectedPokemons={pokemons.map(
										(p) => p.name
									)}
								/>
							</div>
						)}

						<div>
							<div className="border-2 p-2 middle-container rounded-t-sm">
								<div className="py-3 inner-container border-1 flex justify-center flex-col">
									<div className="flex gap-6 justify-center items-center pb-2">
										<div className="h-[10px] w-[20px] bg-green-500"></div>
										<div>
											<p className="text-white">
												Correct
											</p>
										</div>
										<div className="h-[10px] w-[20px] bg-orange-500"></div>
										<div>
											<p className="text-white">
												Partially
											</p>
										</div>
										<div className="h-[10px] w-[20px] bg-red-500"></div>
										<div>
											<p className="text-white">
												Incorrect
											</p>
										</div>
									</div>
									<div className="w-[900px]">
										<PokemonTable pokemons={pokemons} />
									</div>
								</div>
							</div>
							{isClassicPokemonGuessed &&
								Object.keys(dailyPokemon).length > 0 && (
									<div className="border-2 pb-2 pt-4 px-2 rounded-b-sm middle-container">
										<div className="border-1 inner-container p-4 flex gap-8">
											<div className="w-1/2 flex flex-col p-3 border-3 border-[#2C6344] rounded-tr-3xl rounded-br-3xl rounded-tl-lg rounded-bl-lg  bg-[#5ECD8E] animate__animated animate__tada inner-border">
												<p className="mb-2 text-white text-shadow">
													Gotcha!
												</p>
												<div className="flex gap-6">
													<div className="border-4 border-[#333333] rounded-2xl bg-grid-white flex justify-center items-center p-2">
														<img
															src={
																dailyPokemon
																	.sprites
																	?.front_default ||
																"/pokeball.png"
															}
															height="96"
															width="96"
														/>
													</div>
													<div className="flex flex-col">
														<p className="capitalize !text-lg text-[#333333] text-shadow">
															{dailyPokemon.name}
														</p>
														<p className="capitalize pb-1 text-[#333333]">
															#
															{
																dailyPokemon.speciesId
															}
														</p>
														<p className="text-[#42855F] pb-4 text-shadow">
															Attempts:{" "}
															{pokemons.length}
														</p>
														<p className="text-gray-500 pb-2 !text-[10px] text-shadow">
															Yesterday pokémon
															was:
														</p>
														<p className="capitalize text-gray-500 text-shadow">
															{
																yesterdayPokemon.name
															}{" "}
															#
															{
																yesterdayPokemon.speciesId
															}
														</p>
													</div>
												</div>
											</div>
											<div className="w-1/2 text-white flex px-4 pt-4 flex-col text-shadow">
												<p className="text-white !text-lg">
													Next pokémon in:
												</p>
												<div className="my-2 flex gap-4">
													<p className="!text-[16px]">
														{timeLeft}
													</p>
													<p className="text-gray-400 !text-[8px] self-center pt-2">
														Time zone: Europe (00:00
														UTC+2)
													</p>
												</div>
												<NextGameCard mode={1} />
											</div>
										</div>
									</div>
								)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
