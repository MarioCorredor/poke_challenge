import React, { useEffect, useState } from "react";
import { getPokemon, getCountdown } from "../../../helpers";
import { PokemonTable, SearchBar } from "..";
import { usePokemon } from "../../../contexts";
import { NextGameCard } from "../elements";
import "./ClassicGame.css";
import "animate.css";

export const ClassicGame = () => {
	const {
		dailyPokemons,
		isClassicPokemonGuessed,
		setIsClassicPokemonGuessed,
	} = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});

	const [timeLeft, setTimeLeft] = useState("");

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
				<div className="flex outer-container w-[950px] justify-center py-2 border-2 rounded relative h-full">
					<div>
						<h2 className="text-center text-white">Classic Mode</h2>
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
									<div className="border-2 pb-2 pt-4 px-2 middle-container animate__animated animate__fadeInUp">
										<div className="border-1 inner-container p-4 flex gap-8">
											<div className="w-1/2 flex flex-col p-3 text-white border-2 rounded-tr-3xl rounded-tl-lg rounded-b-lg bg-green-700 animate__animated animate__tada">
												<p className="mb-2">Gotcha!</p>
												<div className="flex gap-6">
													<div className="border-2 border-white rounded-2xl bg-white">
														<img
															src={
																dailyPokemon
																	.sprites
																	.front_default
															}
															height="128"
															width="128"
														/>
													</div>
													<div className="flex flex-col">
														<p className="capitalize !text-lg pb-4">
															{dailyPokemon.name}
														</p>
														<p>
															Attempts:{" "}
															{pokemons.length}
														</p>
													</div>
												</div>
											</div>
											<div className="w-1/2 text-white flex px-4 pt-4 flex-col">
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
					{/* <div className="h-[700px]">
						<img src="/red_ball.png" className="absolute pokeball overflow-hidden"/>
					</div> */}
				</div>
			</div>
		</>
	);
};
