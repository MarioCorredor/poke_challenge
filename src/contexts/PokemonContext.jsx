import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto
const PokemonContext = createContext();

// Provider para envolver la app
export const PokemonProvider = ({ children }) => {
	const [dailyPokemons, setDailyPokemons] = useState([]);

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

				// Extrae los Pokémon de cada respuesta y actualiza el estado
				const pokemons = responses.map((data) => data.pokemon); // Suponiendo que `data.pokemon` es el nombre del Pokémon
				setDailyPokemons(pokemons);
			} catch (error) {
				console.error("Error al obtener los Pokémon diarios:", error);
			}
		};

		fetchDailyPokemons();
	}, []);

	return (
		<PokemonContext.Provider value={{ dailyPokemons, setDailyPokemons }}>
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
