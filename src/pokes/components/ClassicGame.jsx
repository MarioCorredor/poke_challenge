import React from "react";
import { useFetch } from "../../hooks";
import { PokemonRow } from "./PokemonRow";

export const ClassicGame = ({ pokemons = [] }) => {
	const url =
		"https://poke-backend-tvv2.onrender.com/pokemons/daily/1/latest";
	const { data, isLoading, hasError } = useFetch(url);
	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : hasError ? (
				<h1>Error al cargar</h1>
			) : (
				<div className="flex justify-center">
					<PokemonRow pokemon={data?.pokemon} />
				</div>
			)}
		</>
	);
};
