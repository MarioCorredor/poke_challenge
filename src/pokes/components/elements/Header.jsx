import React from "react";
import "./Header.css";
import { useNavigate } from "react-router";

export const Header = () => {
	const navigate = useNavigate(); 

	const handleClick = () => {
		navigate("/"); //
	};

	return (
		<>
			<div className="flex justify-center w-full mt-[1rem] mb-[2rem]">
				<div onClick={handleClick} className="header-div cursor-pointer">
					<p className="header-title select-none">PokéChallenges</p>
				</div>
			</div>
		</>
	);
};
