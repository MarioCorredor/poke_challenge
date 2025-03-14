import React, { useState, useEffect } from "react";
import "./HintsCard.css";

export const HintsCard = ({ attempts = 0, dailyPokemon = {} }) => {

	const [selectedHint, setSelectedHint] = useState(null);

	const handleClick = (hintNumber) => {
		if (
			(hintNumber === 1 && attempts >= 4) ||
			(hintNumber === 2 && attempts >= 7) ||
			(hintNumber === 3 && attempts >= 10)
		) {
			setSelectedHint(hintNumber);
		}
	};

	const getArrowPosition = () => {
		switch (selectedHint) {
			case 1:
				return "left-1/6";
			case 2:
				return "left-1/2 transform -translate-x-1/2";
			case 3:
				return "right-1/6";
			default:
				return "left-1/2 transform -translate-x-1/2";
		}
	};

	const renderHintDetails = () => {
		if (!dailyPokemon) return null;

		switch (selectedHint) {
			case 1:
				return (
					<div className="w-[350px] flex justify-center flex-col items-center">
						<p className="text-center">
							This pokémon can have any of these abilities:
						</p>
						<p className="capitalize font-extrabold content !text-[25px]">
							{dailyPokemon.abilities.join(", ")}
						</p>
					</div>
				);
			case 2:
				return (
					<div className="w-[350px] flex justify-center flex-col items-center">
						<p>Types:</p>
						<p className="capitalize font-extrabold content !text-[25px]">
							{dailyPokemon.types.join(", ")}
						</p>
					</div>
				);
			case 3:
				return (
					<div className="w-[350px] flex justify-center flex-col items-center">
						<img
							src={dailyPokemon.sprites.front_default}
							style={{
								filter: "brightness(0) grayscale(100%)", // Apply a black filter
								userSelect: "none", // Prevent selection
							}}
							draggable="false"
						/>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<div className="flex justify-center bg-[#FBFBF9] border-2 border-[#404140] rounded-t-[50px] rounded-bl-[50px] rounded-br-[2px] p-5 flex-col border-inner">
				<p className="text-center mb-4">
					Guess pokémons to unlock hints!
				</p>
				<div className="flex justify-around items-center gap-5">
					{[1, 2, 3].map((hintNumber) => {
						const isClickable =
							(hintNumber === 1 && attempts >= 4) ||
							(hintNumber === 2 && attempts >= 7) ||
							(hintNumber === 3 && attempts >= 10);

						return (
							<div
								key={hintNumber}
								className={`flex flex-col items-center ${
									isClickable
										? "cursor-pointer"
										: "cursor-not-allowed"
								}`}
								onClick={() => handleClick(hintNumber)}>
								<div
									className="w-16 h-16 bg-gray-200 flex items-center justify-center mb-2 rounded-lg"
									style={{
										filter: isClickable
											? "none"
											: "brightness(0.3)",
										userSelect: "none",
									}}>
									<img
										src="https://via.placeholder.com/50"
										draggable="false"
									/>
								</div>
								<p className="!text-[10px]">
									Hint #{hintNumber}
								</p>
								<p className="!text-[10px]">
									{hintNumber === 1
										? "Ability"
										: hintNumber === 2
										? "Types"
										: "Shape"}
								</p>
								<div className="h-4">
									{attempts < hintNumber * 3 + 1 && (
										<p className="!text-[8px] text-gray-500">
											In {hintNumber * 3 + 1 - attempts}{" "}
											tries
										</p>
									)}
								</div>
							</div>
						);
					})}
				</div>
				{selectedHint && (
					<div className="relative mt-5 w-full">
						<div className="bg-gray-200 p-4 rounded-lg shadow-lg w-full h-32 flex items-center justify-center">
							{renderHintDetails()}
						</div>
						<div
							className={`absolute ${getArrowPosition()} -top-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-200`}></div>
					</div>
				)}
			</div>
		</>
	);
};