import React from "react";
import { useNavigate } from "react-router";
import "./NextGameCard.css";

export const NextGameCard = ({ mode }) => {
	const modes = {
		0: {
			title: "Classic Mode",
			image: "/src/assets/pokedex.png",
			description: "Guess the pokémon with some of its attributes!",
		},
		1: {
			title: "Cries Mode",
			image: "/src/assets/chatot.png",
			description: "Guess the pokémon by hearing its cry!",
		},
		2: {
			title: "Silhouette Mode",
			image: "/src/assets/ditto.png",
			description: "Guess the pokémon by its silhouette!",
		},
	};

	const navigate = useNavigate();

	const handleClick = () => {
		switch (mode) {
			case 1:
				navigate("/cries");
				break;
			case 2:
				navigate("/silouette");
				break;
			case 3:
				navigate("/classic");
				break;
			default:
				navigate("/");
				break;
		}
	};

	const { title, image, description } = modes[mode] || {};

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
				<p className="!text-[14px] font-bold">{title}</p>
				<p className="!text-[8px] self-center mt-2">{description}</p>
			</div>
		</div>
	);
};
