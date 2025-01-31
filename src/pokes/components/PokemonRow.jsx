import React, { useEffect, useState } from "react";
import {
	getHighestStat,
	getGeneration,
	getEvolutionStage,
} from "../../helpers";
import { useFetch } from "../../hooks";
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
	const [evoInfo, setEvoInfo] = useState({ stage: "1", trigger: "None" });

	const highest_stat = getHighestStat(stats);
	const gen = getGeneration(generation);
	const type1 = types[0] || "None";
	const type2 = types[1] || "None";

	useEffect(() => {
		if (!data) return;
		const stageInfo = getEvolutionStage(data, name);
		setEvoInfo(stageInfo);
	}, [data, name]);

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
								<img src={front_default} alt={name}/>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="auto-fit">{type1} </p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="auto-fit">{type2}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="auto-fit">{main_color}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="auto-fit">{evoInfo.stage}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="auto-fit">{evoInfo.trigger}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="auto-fit">{abilities[0]}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="auto-fit">{highest_stat}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="auto-fit">{gen}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="auto-fit">{capture_rate}</p>
							</div>
						</div>
					</td>
					<td className="py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="auto-fit">{habitat}</p>
							</div>
						</div>
					</td>
					<td className="normal-case py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="normal-case auto-fit">{height % 10} kg</p>
							</div>
						</div>
					</td>
					<td className="normal-case py-1">
						<div className="w-full flex justify-center">
							<div className="flex justify-center items-center attribute-box border-2 border-gray-200  rounded-lg">
								<p className="normal-case auto-fit">{weight % 10} m</p>
							</div>
						</div>
					</td>
				</>
			)}
		</tr>
	);
};
