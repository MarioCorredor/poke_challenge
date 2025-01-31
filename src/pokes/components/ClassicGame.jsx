import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks";
import { PokemonTable } from "./";

export const ClassicGame = () => {
	const url =
		"https://poke-backend-tvv2.onrender.com/pokemons/daily/1/latest";
	const { data, isLoading, hasError } = useFetch(url);
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		if(!data) return;
		setPokemons((prev) => [...prev, data.pokemon]); 
		console.log(pokemons);
	}, [data, isLoading, hasError]);

	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : hasError ? (
				<h1>Error al cargar</h1>
			) : (
				<>
					<div className="flex justify-self-center w-[800px]">
						<PokemonTable pokemons={pokemons} />
					</div>
				</>
			)}
		</>
	);
};
