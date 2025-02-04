import React from "react";
import { Navigate, Route, Routes } from "react-router";
import {
	ClassicPage,
	CriesPage,
	HomePage,
	SilouettePage,
} from "../src/pokes/pages";
import { PokemonProvider } from "./contexts";

export const PokeChallengesApp = () => {
	return (
		<>
			<PokemonProvider>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/classic" element={<ClassicPage />} />
					<Route path="/cries" element={<CriesPage />} />
					<Route path="/silouette" element={<SilouettePage />} />
					<Route path="/*" element={<Navigate to="/" />} />
				</Routes>
			</PokemonProvider>
		</>
	);
};
