import React from "react";
import { PokemonRow } from "./";
import "./PokemonTable.css";

export const PokemonTable = ({ pokemons = [] }) => {
	return (
		<table className="table-fixed border-collapse w-full capitalize">
			<thead>
				<tr className="text-center">
					<th className="py-1 auto-fit text-center">Pokémon</th>
					<th className="py-1 auto-fit">Type 1</th>
					<th className="py-1 auto-fit">Type 2</th>
					<th className="py-1 auto-fit">Color</th>
					<th className="py-1 auto-fit">Stage</th>
					<th className="py-1 auto-fit">Evo Trigger</th>
					<th className="py-1 auto-fit">Ability</th>
					<th className="py-1 auto-fit">Highest Stat</th>
					<th className="py-1 auto-fit">Gen</th>
					<th className="py-1 auto-fit">Capture Rate</th>
					<th className="py-1 auto-fit">Habitat</th>
					<th className="py-1 auto-fit">Height</th>
					<th className="py-1 auto-fit">Weight</th>
				</tr>
			</thead>
			<tbody className="space-y-2">
				{pokemons.map((pokemon) => (
					<PokemonRow key={pokemon.id} pokemon={pokemon} />
				))}
			</tbody>
		</table>
	);
};
