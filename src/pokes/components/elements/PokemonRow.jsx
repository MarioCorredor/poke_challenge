import React, { useEffect, useState } from "react";
import {
	getHighestStat,
	getGeneration,
	getEvolutionStage,
	comparePokemonAttributes,
	getBgColor,
} from "../../../helpers";
import { useFetch } from "../../../hooks";
import { usePokemon } from "../../../contexts";
import "./PokemonRow.css";

export const PokemonRow = ({ pokemon }) => {
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

	const url = `https://poke-backend-tvv2.onrender.com/pokemons/${id}/evolution`;
	const { data, isLoading, hasError } = useFetch(url);
	const [evoInfo, setEvoInfo] = useState({ stage: "", trigger: "None" });
	const {
		dailyPokemons,
		setIsClassicPokemonGuessed,
	} = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});
	const [dailyPokemonEvoData, setDailyPokemonEvoData] = useState(null);
	const [comparisonResults, setComparisonResults] = useState({});

	const highest_stat = getHighestStat(stats);
	const gen = getGeneration(generation);
	const type1 = types[0] || "None";
	const type2 = types[1] || "None";

	useEffect(() => {
		if (!data) return;
		const stageInfo = getEvolutionStage(data, name);
		setEvoInfo(stageInfo);
	}, [data, name]);

	useEffect(() => {
		if (dailyPokemons.length < 1) return;
		setDailyPokemon(dailyPokemons[0]);
	}, [dailyPokemons]);

	const adjustFontSize = (element) => {
		const textLength = element.textContent.trim().length;
		const maxSize = 8;
		const minSize = 4;

		let fontSize = maxSize;

		if (textLength >= 6) {
			const reductionFactor = Math.exp((textLength - 6) / 2);

			fontSize = Math.max(minSize, maxSize - reductionFactor);
		}

		element.style.fontSize = `${fontSize}px`;
	};

	useEffect(() => {
		const elements = document.querySelectorAll(".responsive-text");
		elements.forEach(adjustFontSize);
	}, [
		evoInfo,
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
		if (!dailyPokemon?.id) return;

		const fetchDailyPokemonEvolution = async () => {
			try {
				const response = await fetch(
					`https://poke-backend-tvv2.onrender.com/pokemons/${dailyPokemon.id}/evolution`
				);
				const result = await response.json();
				setDailyPokemonEvoData(result);
			} catch (error) {
				console.error("Error fetching daily Pokémon evolution:", error);
			}
		};

		fetchDailyPokemonEvolution();
	}, [dailyPokemon]);

	useEffect(() => {
		if (!dailyPokemon || !pokemon || !data || !dailyPokemonEvoData) return;

		const dailyPokemonEvolution = getEvolutionStage(
			dailyPokemonEvoData,
			dailyPokemon.name
		);
		const dailyPokemonHighestStat = getHighestStat(dailyPokemon.stats);

		const pokemonEvolution = getEvolutionStage(data, pokemon.name);
		const pokemonHighestStat = getHighestStat(pokemon.stats);

		// Crear los objetos enriquecidos con evolución y stat más alta
		const enrichedDailyPokemon = {
			...dailyPokemon,
			evolutionStage: dailyPokemonEvolution.stage,
			evolutionTrigger: dailyPokemonEvolution.trigger,
			highestStat: dailyPokemonHighestStat,
			generation: getGeneration(dailyPokemon.generation), // Convierte aquí
		};
		
		const enrichedPokemon = {
			...pokemon,
			evolutionStage: pokemonEvolution.stage,
			evolutionTrigger: pokemonEvolution.trigger,
			highestStat: pokemonHighestStat,
			generation: getGeneration(pokemon.generation), // Convierte aquí
		};

		// Comparar atributos y actualizar el estado de resultados
		const comparisonResult = comparePokemonAttributes(
			enrichedPokemon,
			enrichedDailyPokemon
		);
		setComparisonResults(comparisonResult);
	}, [dailyPokemon, pokemon, data, dailyPokemonEvoData]);

	useEffect(() => {
		if (
			dailyPokemon === null ||
			pokemon === null ||
			comparisonResults === null ||
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
		<tr className="text-center border-gray-200">
			{hasError ? (
				<td colSpan="13" className="py-2 text-red-500">
					Error al cargar la información
				</td>
			) : isLoading ? (
				<td colSpan="13" className="py-2">
					<img
						src="/pokeball.svg"
						className="animate-spin mx-auto"
						width="32"
						height="32"
					/>
				</td>
			) : (
				<>
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container bg-white animate__animated animate__zoomIn">
								<div className="flex justify-center items-center attribute-box">
									<img src={front_default} alt={name} />
								</div>
							</div>
						</div>
					</td>
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
										"type1",
										comparisonResults
									)}`}>
									<p className="responsive-text">{type1}</p>
								</div>
							</div>
						</div>
					</td>
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
										"type2",
										comparisonResults
									)}`}>
									<p className="responsive-text">{type2}</p>
								</div>
							</div>
						</div>
					</td>
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
										"mainColor",
										comparisonResults
									)}`}>
									<p className="responsive-text">
										{main_color}
									</p>
								</div>
							</div>
						</div>
					</td>
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
										"evolutionStage",
										comparisonResults
									)}`}>
									<p className="responsive-text">
										{evoInfo.stage}
									</p>
								</div>
							</div>
						</div>
					</td>
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
										"evolutionTrigger",
										comparisonResults
									)}`}>
									<p className="responsive-text">
										{evoInfo.trigger}
									</p>
								</div>
							</div>
						</div>
					</td>
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn ">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
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
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
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
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
										"generation",
										comparisonResults
									)}`}>
									<p className="responsive-text">{gen}</p>
								</div>
							</div>
						</div>
					</td>
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
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
					<td className="py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
										"habitat",
										comparisonResults
									)}`}>
									<p className="responsive-text">{habitat}</p>
								</div>
							</div>
						</div>
					</td>
					<td className="normal-case py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
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
					<td className="normal-case py-2">
						<div className="w-full flex justify-center">
							<div className="attribute-container animate__animated animate__zoomIn">
								<div
									className={`flex justify-center items-center attribute-box ${getBgColor(
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
				</>
			)}
		</tr>
	);
};
