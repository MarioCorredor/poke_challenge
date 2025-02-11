import React from "react";
import { PokemonRow } from "..";
import "./PokemonTable.css";

export const PokemonTable = ({ pokemons = [] }) => {
	return (
		<>
			<div className="background-grid h-[330px] overflow-auto border-2">
				<table className="table-fixed border-collapse w-full capitalize text-white">
					{ (
						<thead>
							<tr className="text-center text-shadow">
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Pokémon
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Type 1
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Type 2
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Color
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Stage
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Evo Trigger
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Ability
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Highest Stat
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Gen
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Capture Rate
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Habitat
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Height
												</p>
											</div>
										</div>
									</div>
								</th>
								<th className="py-1 text-center text-shadow">
									<div className="w-full flex justify-center">
										<div className="col-header w-[55px] h-[38px]">
											<div className="flex justify-center items-center">
												<p className="!text-[8px] z-10 text-white">
													Weight
												</p>
											</div>
										</div>
									</div>
								</th>
							</tr>
						</thead>
					)}
					<tbody>
						{pokemons
							.map((pokemon) => (
								<PokemonRow
									key={pokemon.id}
									pokemon={pokemon}
								/>
							))
							.reverse()}
					</tbody>
				</table>
			</div>
		</>
	);
};
