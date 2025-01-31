import React, { useEffect } from "react";
import { useFetch } from "../../hooks";
import { PokemonRow } from "./PokemonRow";

export const CriesGame = (pokemons = []) => {
	const url =
		"https://poke-backend-tvv2.onrender.com/pokemons/daily/2/latest";
	const { data, isLoading, hasError } = useFetch(url);

	useEffect(() => {
		if(!data) return;
		console.log(data)
	}, [isLoading]);

	return (
		<>
			<div>ClassicGame</div>
			{isLoading ? (
				<h1>Loading...</h1>
			) : hasError ? (
				<h1>Error al cargar</h1>
			) : (
				<div>
					<audio src="">
						Your browser does not support the audio element.
					</audio>
				</div>
			)}
		</>
	);
};
