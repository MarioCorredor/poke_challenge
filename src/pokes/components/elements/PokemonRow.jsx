import React, { useEffect, useState } from "react";
import {
	getHighestStat,
	getGeneration,
	getEvolutionStage,
} from "../../../helpers";
import { useFetch } from "../../../hooks";
import "./PokemonRow.css";
import { usePokemon } from "../../../contexts";

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
	const [evoInfo, setEvoInfo] = useState({ stage: "1", trigger: "None" });
	const { dailyPokemons } = usePokemon();
	const [dailyPokemon, setDailyPokemon] = useState({});

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

	return (
		<tr className="text-center border-gray-200">
			{hasError ? (
				<td colSpan="13" className="py-1 text-red-500">
					Error al cargar la información
				</td>
			) : isLoading ? (
				<td colSpan="13" className="py-1">
					<img
						src="/pokeball.svg"
						className="animate-spin mx-auto"
						width="32"
						height="32"
					/>
				</td>
			) : (
				<>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<img src={front_default} alt={name} />
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text">{type1}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text">{type2}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text">{main_color}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text">
									{evoInfo.stage}
								</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text">
									{evoInfo.trigger}
								</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text">
									{abilities[0]}
								</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text">
									{highest_stat}
								</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text">{gen}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text">
									{capture_rate}
								</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text">{habitat}</p>
							</div>
						</div>
					</td>
					<td className="normal-case py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text normal-case">
									{height / 10}m
								</p>
							</div>
						</div>
					</td>
					<td className="normal-case py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="responsive-text normal-case">
									{weight / 10}kg
								</p>
							</div>
						</div>
					</td>
				</>
			)}
		</tr>
	);
};
