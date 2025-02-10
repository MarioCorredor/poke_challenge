import React, { useEffect, useState } from "react";
import { usePokemon } from "../../../contexts";
import { comparateNames, getBgColor, getCardAnimation } from "../../../helpers";
import "./PokemonListCard.css";

export const PokemonListCard = ({ pokemon, dailyPokemon }) => {
	const {
		id,
		name,
		sprites: { front_default },
		abilities,
		types,
		habitat,
		main_color,
		stats,
		capture_rate,
		generation,
		weight,
		height,
	} = pokemon;

	const [comparisonResults, setComparisonResults] = useState({});
	const {
		dailyPokemons,
		setIsCriesPokemonGuessed,
		setIsSilouettePokemonGuessed,
	} = usePokemon();

	useEffect(() => {
		if (!pokemon || !dailyPokemon || !dailyPokemon.name) return;
		setComparisonResults(comparateNames(pokemon, dailyPokemon));
	}, [pokemon, dailyPokemon]);

	useEffect(() => {
		if (
			dailyPokemon === null ||
			pokemon === null ||
			comparisonResults === null ||
			Object.keys(comparisonResults).length === 0
		)
			return;

		const namesMatch = Object.values(comparisonResults).every(
			(result) => result === true
		);

		if ( dailyPokemon.name === dailyPokemons[1].name && namesMatch) {
			setIsCriesPokemonGuessed(true);
		}

		if ( dailyPokemon.name === dailyPokemons[2].name && namesMatch) {
			setIsSilouettePokemonGuessed(true);
		}
	}, [pokemon, dailyPokemon, comparisonResults]);

	return (
		<>
			{comparisonResults != null ? (
				<>
					<div
						className={`flex flex-row items-center border-2 rounded-lg w-[300px] animate__animated ${getCardAnimation(
							comparisonResults
						)} ${getBgColor("name", comparisonResults)}`}>
						<img src={front_default} />
						<div className="flex justify-start w-full">
							<p className="capitalize">{name}</p>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="flex justify-center">
						<img
							src="/pokeball.svg"
							className="animate-spin mx-auto"
							width="40"
							height="40"
						/>
					</div>
				</>
			)}
		</>
	);
};
