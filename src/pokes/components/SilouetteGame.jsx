import React from "react";
import { useFetch } from "../../hooks";
import { PokemonRow } from "./PokemonRow";

export const SilouetteGame = (pokemons = []) => {
	const url =
		"https://poke-backend-tvv2.onrender.com/pokemons/daily/3/latest";
	const { data, isLoading, hasError } = useFetch(url);
	return (
		<>
			<div>ClassicGame</div>
			{isLoading ? (
				<h1>Loading...</h1>
			) : hasError ? (
				<h1>Error al cargar</h1>
			) : (
				<PokemonRow pokemon={data?.pokemon} />
			)}
		</>
	);
};
