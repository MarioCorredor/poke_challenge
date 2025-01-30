import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { ClassicPage, CriesPage, HomePage, SilouettePage } from "../src/pokes/pages"

export const PokeChallengesApp = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/classic" element={<ClassicPage/>} />
				<Route path="/cries" element={<CriesPage/>} />
				<Route path="/silouette" element={<SilouettePage/>} />
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</>
	);
};
