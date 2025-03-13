import React from "react";
import { useNavigate } from "react-router";
import "./NextGameCard.css";

export const NextGameCard = ({ mode }) => {
	const modes = {
		0: {
			title: "Classic Mode",
			image: "/src/assets/pokedex.png",
			description: "Guess the pokémon with some of its attributes!",
			color: "#FF606C",
		},
		1: {
			title: "Cries Mode",
			image: "/src/assets/chatot.png",
			description: "Guess the pokémon by hearing its cry!",
			color: "#36BBFC",
		},
		2: {
			title: "Silhouette Mode",
			image: "/src/assets/ditto.png",
			description: "Guess the pokémon by its silhouette!",
			color: "#C991E4",
		},
	};

	const navigate = useNavigate();

	const handleClick = () => {
		switch (mode) {
			case 0:
				navigate("/classic");
				break;
			case 1:
				navigate("/cries");
				break;
			case 2:
				navigate("/silouette");
				break;
			default:
				navigate("/");
				break;
		}
	};

	const { title, image, description, color } = modes[mode] || {};

	return (
		<div
			className="flex p-4 border-4 rounded-lg text-white next-card cursor-pointer select-none"
			onClick={handleClick}>
			<div className="flex items-center justify-center pr-4">
				<img
					src={image}
					alt={title}
					height="64"
					width="64"
					className="max-w-none"
				/>
			</div>
			<div className="flex flex-col">
				<p className="!text-[28px] font-bold title-text" style={{ color: color }}>
					{title}
				</p>
				<p className="!text-[8px] self-center mt-2">{description}</p>
			</div>
		</div>
	);
};
