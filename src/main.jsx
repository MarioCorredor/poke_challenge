import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PokeChallengesApp } from "./PokeChallengesApp.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
		<BrowserRouter>
			<PokeChallengesApp />
		</BrowserRouter>
	/*{ </StrictMode> }*/
);
