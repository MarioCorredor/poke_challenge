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
				<div className="flex flex-col justify-center gap-3 select-none">
					<div className="flex justify-center">
						<div onClick={handleClickClassic} className="bg-white menu-item flex border-2 rounded-tl-2xl rounded-br-2xl rounded-tr rounded-bl p-3 flex-col w-[325px] h-[125px] cursor-pointer">
							<h3 className="pt-1">Classic Mode</h3>
							<div className="flex items-center pt-2">
								<div className="flex justify-center items-center overflow-hidden w-[60px] h-[60px]">
									<img
										className="max-w-[76px] max-h-[76px]"
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png"
									/>
								</div>
								<p className="!text-[10px] ps-3">
									Guess the pokémon with some of its
									attributes!
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-center">
						<div onClick={handleClickCries} className="bg-white menu-item flex border-2 rounded-tl-2xl rounded-br-2xl rounded-tr rounded-bl p-3 flex-col w-[325px] h-[125px] cursor-pointer">
							<h3 className="pt-1">Cries Mode</h3>
							<div className="flex items-center pt-2">
								<div className="flex justify-center items-center overflow-hidden w-[60px] h-[60px]">
									<img
										className="max-w-[76px] max-h-[76px]"
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/441.png"
									/>
								</div>
								<p className="!text-[10px] ps-3">
									Guess the pokémon by hearing its cry!
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-center">
						<div onClick={handleClickSilouette} className="bg-white menu-item flex border-2 rounded-tl-2xl rounded-br-2xl rounded-tr rounded-bl p-3 flex-col w-[325px] h-[125px] cursor-pointer">
							<h3 className="pt-1">Silhouette Mode</h3>
							<div className="flex items-center pt-2">
								<div className="flex justify-center items-center overflow-hidden w-[60px] h-[60px]">
									<img
										className="max-w-[76px] max-h-[76px] brightness-0"
										src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png"
									/>
								</div>
								<p className="!text-[10px] ps-3">
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
