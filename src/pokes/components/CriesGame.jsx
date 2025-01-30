import React from "react";
import { useFetch } from "../../hooks";
import { PokemonRow } from "./PokemonRow";

export const CriesGame = (pokemons = []) => {
	const url =
		"https://poke-backend-tvv2.onrender.com/pokemons/daily/2/latest";
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
