import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks";
import { getPokemon } from "../../../helpers";
import { PokemonTable, SearchBar } from "..";
import { usePokemon } from "../../../contexts";
import "./ClassicGame.css";

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
			<div className="flex flex-col items-center w-full">
				<div className="flex outer-container w-[950px] justify-center py-2 border-2">
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
							<div className="border-2 p-2 middle-container">
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
							{isClassicPokemonGuessed && (
								<div className="border-2 pb-2 pt-4 px-2 middle-container">
									<div className="border-1 inner-container p-4 flex flex-col">
										<p className="text-white">
											Congratulations, you guessed today's
											pokémon!
										</p>
										<div className="w-full">
											<div>
												<div className="attribute-container bg-white animate__animated animate__zoomIn">
													<div className="flex justify-center items-center attribute-box">
														{/* <img src={ dailyPokemon.sprites.front_default }
																alt={dailyPokemon.name}/> */}
													</div>
												</div>
												<div></div>
											</div>
											<div></div>
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
