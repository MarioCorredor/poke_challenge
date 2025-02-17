import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto
const PokemonContext = createContext();

// Provider para envolver la app
export const PokemonProvider = ({ children }) => {
	const [dailyPokemons, setDailyPokemons] = useState([]);
	const [yesterdayPokemons, setYesterdayPokemons] = useState([]);
	const [isClassicPokemonGuessed, setIsClassicPokemonGuessed] =
		useState(false);
	const [isCriesPokemonGuessed, setIsCriesPokemonGuessed] = useState(false);
	const [isSilouettePokemonGuessed, setIsSilouettePokemonGuessed] =
		useState(false);

	useEffect(() => {
		const fetchDailyPokemons = async () => {
			try {
				const gameIds = [1, 2, 3];
				const responses = await Promise.all(
					gameIds.map((id) =>
						fetch(
							`https://poke-backend-tvv2.onrender.com/pokemons/daily/${id}/latest`
						).then((res) => res.json())
					)
				);

				const pokemons = responses.map((data) => data.pokemon);
				setDailyPokemons(pokemons);
			} catch (error) {
				console.error("Error retrieving daily Pokémons:", error);
			}
		};

		const fetchYesterdayPokemons = async () => {
			try {
				const gameIds = [1, 2, 3];
				const responses = await Promise.all(
					gameIds.map((id) =>
						fetch(
							`https://poke-backend-tvv2.onrender.com/pokemons/daily/${id}/yesterday`
						).then((res) => res.json())
					)
				);

				const pokemons = responses.map((data) => data.pokemon);
				setYesterdayPokemons(pokemons);
			} catch (error) {
				console.error("Error retrieving yesterday daily Pokémons:", error);
			}
		};

		fetchDailyPokemons();
		fetchYesterdayPokemons();
	}, []);

	return (
		<PokemonContext.Provider
			value={{
				dailyPokemons,
				setDailyPokemons,
				yesterdayPokemons,
				setYesterdayPokemons,
				isClassicPokemonGuessed,
				setIsClassicPokemonGuessed,
				isCriesPokemonGuessed,
				setIsCriesPokemonGuessed,
				isSilouettePokemonGuessed,
				setIsSilouettePokemonGuessed,
			}}>
			{children}
		</PokemonContext.Provider>
	);
};

// Hook para usar el contexto
export const usePokemon = () => {
	const context = useContext(PokemonContext);
	if (!context) {
		throw new Error("usePokemon debe usarse dentro de un PokemonProvider");
	}
	return context;
};
