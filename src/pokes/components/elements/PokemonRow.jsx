import React, { useEffect, useState } from "react";
import {
	getHighestStat,
	getGeneration,
	comparePokemonAttributes,
	getBgColor,
} from "../../../helpers";
import { usePokemon } from "../../../contexts";
import "./PokemonRow.css";

export const PokemonRow = ({ pokemon }) => {
	const {
		id,
		name,
		sprites: { front_default },
		abilities,
		types,
		main_color,
		stats,
		capture_rate,
		generation,
		habitat,
		weight,
		height,
		evolution_stage,
		evolution_trigger,
	} = pokemon;

	const { dailyPokemons, setIsClassicPokemonGuessed } = usePokemon();

	const [dailyPokemon, setDailyPokemon] = useState({});
	const [comparisonResults, setComparisonResults] = useState({});

	const highest_stat = getHighestStat(stats);
	const gen = getGeneration(generation);
	const type1 = types[0] || "None";
	const type2 = types[1] || "None";

	const adjustFontSize = (element) => {
		const textLength = element.textContent.trim().length;
		const maxSize = 8;
		const minSize = 4;

		let fontSize = maxSize;

		if (textLength >= 6) {
			const reductionFactor = Math.exp((textLength - 7) / 2);

			fontSize = Math.max(minSize, maxSize - reductionFactor);
		}

		element.style.fontSize = `${fontSize}px`;
	};

	useEffect(() => {
		const elements = document.querySelectorAll(".responsive-text");
		elements.forEach(adjustFontSize);
	}, [
		evolution_stage,
		evolution_trigger,
		type1,
		type2,
		main_color,
		abilities,
		highest_stat,
		gen,
		capture_rate,
		habitat,
		height,
		weight,
	]);

	useEffect(() => {
		if (dailyPokemons.length > 0) {
			setDailyPokemon(dailyPokemons[0]);
		}
	}, [dailyPokemons]);

	useEffect(() => {
		if (Object.keys(dailyPokemon).length < 1 || !pokemon) return;

		const dailyPokemonHighestStat = getHighestStat(dailyPokemon.stats);
		const comparisonResult = comparePokemonAttributes(
			{
				...pokemon,
				highestStat: highest_stat,
				generation: gen,
			},
			{
				...dailyPokemon,
				highestStat: dailyPokemonHighestStat,
				generation: getGeneration(dailyPokemon.generation),
			}
		);
		setComparisonResults(comparisonResult);
	}, [dailyPokemon, pokemon]);

	useEffect(() => {
		if (
			!dailyPokemon ||
			!pokemon ||
			!comparisonResults ||
			Object.keys(comparisonResults).length === 0
		)
			return;

		const filteredResults = Object.entries(comparisonResults).filter(
			([key]) => key !== "type1Crossed" && key !== "type2Crossed"
		);

		const allAttributesMatch =
			filteredResults.length > 0 &&
			filteredResults.every(
				([, result]) => result === true || result === "equal"
			);

		if (allAttributesMatch) {
			setIsClassicPokemonGuessed(true);
		}
	}, [pokemon, dailyPokemon, comparisonResults]);

	return (
		<>
			<tr className="text-center border-gray-200">
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container bg-white animate__animated animate__zoomIn">
							<div className="flex justify-center items-center attribute-box shadow-2xl">
								<img src={front_default} alt={name} />
							</div>
						</div>
					</div>
				</td>
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"type1",
									comparisonResults
								)}`}>
								<p className="responsive-text">{type1}</p>
							</div>
						</div>
					</div>
				</td>
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"type2",
									comparisonResults
								)}`}>
								<p className="responsive-text">{type2}</p>
							</div>
						</div>
					</div>
				</td>
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"mainColor",
									comparisonResults
								)}`}>
								<p className="responsive-text">{main_color}</p>
							</div>
						</div>
					</div>
				</td>
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"evolution_stage",
									comparisonResults
								)}`}>
								<p className="responsive-text">
									{evolution_stage}
								</p>
							</div>
						</div>
					</div>
				</td>
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"evolution_trigger",
									comparisonResults
								)}`}>
								<p className="responsive-text">
									{evolution_trigger}
								</p>
							</div>
						</div>
					</div>
				</td>
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn ">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"ability",
									comparisonResults
								)}`}>
								<p className="responsive-text">
									{abilities[0]}
								</p>
							</div>
						</div>
					</div>
				</td>
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"highestStat",
									comparisonResults
								)}`}>
								<p className="responsive-text">
									{highest_stat}
								</p>
							</div>
						</div>
					</div>
				</td>
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"generation",
									comparisonResults
								)}`}>
								<p className="responsive-text">{gen}</p>
							</div>
						</div>
					</div>
				</td>
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"captureRate",
									comparisonResults
								)}`}>
								<p className="responsive-text">
									{capture_rate}
								</p>
							</div>
						</div>
					</div>
				</td>
				<td className="py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"habitat",
									comparisonResults
								)}`}>
								<p className="responsive-text">{habitat}</p>
							</div>
						</div>
					</div>
				</td>
				<td className="normal-case py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"height",
									comparisonResults
								)}`}>
								<p className="responsive-text normal-case">
									{height / 10}m
								</p>
							</div>
						</div>
					</div>
				</td>
				<td className="normal-case py-2 text-shadow">
					<div className="w-full flex justify-center">
						<div className="attribute-container animate__animated animate__zoomIn">
							<div
								className={`flex justify-center items-center attribute-box shadow-2xl ${getBgColor(
									"weight",
									comparisonResults
								)}`}>
								<p className="responsive-text normal-case">
									{weight / 10}kg
								</p>
							</div>
						</div>
					</div>
				</td>
			</tr>
		</>
	);
};
