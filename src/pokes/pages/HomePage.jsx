import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router";

export const HomePage = () => {
	const navigate = useNavigate(); 

	const handleClickClassic = () => {
		navigate("/classic"); 
	};
	const handleClickCries = () => {
		navigate("/cries");
	};
	const handleClickSilouette = () => {
		navigate("/silouette");
	};

	return (
		<>
			<div className="flex justify-center flex-col">
				<div className="flex flex-col justify-center gap-3 select-none">
					<div className="flex justify-center">
						<div
							onClick={handleClickClassic}
							className="bg-white menu-item flex border-3 border-white rounded-[20px] p-5 w-[325px] h-[125px] cursor-pointer justify-center">
							<div className="flex justify-center items-center">
								<img
									className="max-w-[64px] max-h-[64px]"
									src="/src/assets/pokedex.png"
								/>
							</div>
							<div className="flex ps-5 flex-col">
								<h3 className="font-title text-[#FF606C] !text-[28px]">
									Classic Mode
								</h3>
								<p className="!text-[8px] text-white">
									Guess the pokémon with some of its
									attributes!
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-center">
						<div
							onClick={handleClickCries}
							className="bg-white menu-item flex border-3 border-white rounded-[20px] p-5 w-[325px] h-[125px] cursor-pointer justify-center">
							<div className="flex justify-center items-center">
								<img
									className="max-w-[64px] max-h-[64px]"
									src="/src/assets/chatot.png"
								/>
							</div>
							<div className="flex ps-5 flex-col">
								<h3 className="font-title text-[#36BBFC] !text-[28px]">
									Cries Mode
								</h3>
								<p className="!text-[8px] text-white">
									Guess the pokémon by hearing its cry!
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-center">
						<div
							onClick={handleClickSilouette}
							className="bg-white menu-item flex border-3 border-white rounded-[20px] p-5 w-[325px] h-[125px] cursor-pointer justify-center">
							<div className="flex justify-center items-center">
								<img
									className="max-w-[64px] max-h-[64px]"
									src="/src/assets/ditto.png"
								/>
							</div>
							<div className="flex ps-5 flex-col">
								<h3 className="font-title text-[#C991E4] !text-[28px]">
									Silhouette Mode								
								</h3>
								<p className="!text-[8px] text-white">
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
