import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router";

export const HomePage = () => {
	const navigate = useNavigate(); // Obtén la función para redirigir

	const handleClickClassic = () => {
		navigate("/classic"); // Redirige a la ruta deseada
	};
	const handleClickCries= () => {
		navigate("/cries"); // Redirige a la ruta deseada
	};
	const handleClickSilouette = () => {
		navigate("/silouette"); // Redirige a la ruta deseada
	};

	return (
		<>
			<div className="flex justify-center flex-col">
				<p className="text-center mb-2">Guess the daily pokémon!</p>
				<div className="flex flex-col justify-center gap-2 select-none">
					<div className="flex justify-center">
						<div onClick={handleClickClassic} className="menu-item flex justify-center border-2 rounded-tl-2xl rounded-br-2xl rounded-tr rounded-bl p-3 flex-col w-[325px] cursor-pointer">
							<p>Classic Mode</p>
							<div className="flex items-center">
								<div className="flex justify-center items-center overflow-hidden w-[30px] h-[30px]">
									<img
										className="max-w-[46px] max-h-[46px]"
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png"
									/>
								</div>
								<p className="!text-[6px] ">
									Guess the pokémon with some of its
									attributes!
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-center">
						<div onClick={handleClickCries} className="menu-item flex justify-center border-2 rounded-tl-2xl rounded-br-2xl rounded-tr rounded-bl p-3 flex-col w-[325px] cursor-pointer">
							<p>Cries Mode</p>
							<div className="flex items-center">
								<div className="flex justify-center items-center overflow-hidden w-[30px] h-[30px]">
									<img
										className="max-w-[46px] max-h-[46px]"
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/441.png"
									/>
								</div>
								<p className="!text-[6px] ">
									Guess the pokémon by hearing its cry!
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-center">
						<div onClick={handleClickSilouette} className="menu-item flex justify-center border-2 rounded-tl-2xl rounded-br-2xl rounded-tr rounded-bl p-3 flex-col w-[325px] cursor-pointer">
							<p>Silhouette Mode</p>
							<div className="flex items-center">
								<div className="flex justify-center items-center overflow-hidden w-[30px] h-[30px]">
									<img
										className="max-w-[46px] max-h-[46px] brightness-0"
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png"
									/>
								</div>
								<p className="!text-[6px] ">
									Guess the pokémon by its silhouette!
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
