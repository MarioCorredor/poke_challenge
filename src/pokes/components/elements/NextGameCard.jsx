import React from "react";
import { useNavigate } from "react-router";

export const NextGameCard = ({ mode }) => {
	const modes = {
		1: {
			title: "Cries Mode",
			image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/441.png",
			description: "Guess the pokémon by hearing its cry!",
		},
		2: {
			title: "Silhouette Mode",
			image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png",
			description: "Guess the pokémon by its silhouette!",
		},
		3: {
			title: "Classic Mode",
			image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png",
			description: "Guess the pokémon with some of its attributes!",
		},
	};

    const navigate = useNavigate(); 

    const handleClick = () => {
        console.log(mode)
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
    }

	const { title, image, description } = modes[mode] || {};

	return (
		<div className="flex flex-col p-4 border-2 rounded-lg bg-gray-800 text-white menu-item cursor-pointer select-none" onClick={handleClick}>
			<p className="!text-[14px] font-bold">{title}</p>
			<div className="flex">
				<div className="flex items-center justify-center w-[50px] h-[50px] overflow-hidden"> 
					<img src={image} alt={title} height="64" width="64" className="max-w-none" />
				</div>
				<p className="!text-[8px] text-center self-center">{description}</p>
			</div>
		</div>
	);
};
