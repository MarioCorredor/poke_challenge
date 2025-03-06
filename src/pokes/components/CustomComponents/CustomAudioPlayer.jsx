import React, { useEffect, useRef, useState } from "react";
import "./CustomAudioPlayer.css";

export const CustomAudioPlayer = ({ src }) => {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(1);

	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		} else {
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleVolumeChange = (e) => {
		const newVolume = e.target.value;
		setVolume(newVolume);
		audioRef.current.volume = newVolume;
	
		// Establece la variable CSS para el progreso
		e.target.style.setProperty("--progress", `${newVolume * 100}%`);
	};

	useEffect(() => {
		const slider = document.querySelector(".slider-volume");
		if (slider) {
			slider.style.setProperty("--progress", `${volume * 100}%`);
		}
	}, []);

	const handleAudioEnded = () => {
		setIsPlaying(false);
	};

	

	return (
		<div className="audio-player !rounded-full py-4 border-2">
			<audio ref={audioRef} src={src} onEnded={handleAudioEnded} />
			<div className="border-black border-1 !rounded-full">
				<div></div>
				<div className="flex border-white border-3 !rounded-full p-2 items-center gap-2">
					<img src="/src/assets/volume.svg" alt="volume" height="28" width="28" />
					<input
						className="slider-volume !rounded-full pr-1"
						type="range"
						min="0"
						max="1"
						step="0.01"
						value={volume}
						onChange={handleVolumeChange}
					/>
				</div>
			</div>
			<div className="volume-control flex justify-center items-center">
				<button className="play-btn" onClick={togglePlay}>
					{isPlaying ? (
						<img
							src="/src/assets/stop_button.png"
							height="32"
							width="32"
						/>
					) : (
						<img
							src="/src/assets/play_button.png"
							height="32"
							width="32"
						/>
					)}
				</button>
			</div>
		</div>
	);
};
