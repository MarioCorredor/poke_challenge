import React, { useEffect, useState } from "react";
import {
	getHighestStat,
	getGeneration,
	getEvolutionStage,
} from "../../helpers";
import { useFetch } from "../../hooks";

export const PokemonRow = ({ pokemon }) => {
	const {
		id,
		name,
		sprites: { front_default },
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
		<>
			{hasError ? (
				<p>Error al cargar la información de evolución.</p>
			) : isLoading ? (
				<div className="flex justify-center">
					<img src="/pokeball.svg" className="animate-spin" width="64" height="64"/>
				</div>
			) : (
				<div className="flex flex-row gap-x-1 capitalize justify-center">
					<div>
						<img src={front_default} />
					</div>
					<div>
						<p>{type1} </p>
					</div>
					<div>
						<p>{type2}</p>
					</div>
					<div>
						<p>{main_color}</p>
					</div>
					<div>
						<p>{evoInfo.stage}</p>
					</div>
					<div>
						<p>{evoInfo.trigger}</p>
					</div>
					<div>
						<p>{highest_stat}</p>
					</div>
					<div>
						<p>{gen}</p>
					</div>
					<div>
						<p>{capture_rate}</p>
					</div>
					<div>
						<p>{habitat}</p>
					</div>
					<div>
						<p className="normal-case">{height % 10} kg</p>
					</div>
					<div>
						<p className="normal-case">{weight % 10} m</p>
					</div>
				</div>
			)}
		</>
	);
};
