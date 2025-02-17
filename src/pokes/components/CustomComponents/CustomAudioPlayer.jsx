import React, { useRef, useState } from "react";
import "./CustomAudioPlayer.css";

export const CustomAudioPlayer = ({ src }) => {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(1);

	const togglePlay = () => {
		if (isPlaying) {
			// Si estaba reproduciendo, se pausa y se reinicia a 0
			audioRef.current.pause();
			audioRef.current.currentTime = 0; // Reinicia el audio
		} else {
			// Si estaba pausado, empieza desde el principio
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleVolumeChange = (e) => {
		const newVolume = e.target.value;
		setVolume(newVolume);
		audioRef.current.volume = newVolume;
	};

	const handleAudioEnded = () => {
		setIsPlaying(false); // Volver a mostrar el botón de Play cuando termine el audio
	};

	return (
		<div className="audio-player">
			<audio ref={audioRef} src={src} onEnded={handleAudioEnded} />
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={volume}
				onChange={handleVolumeChange}
			/>
			<div className="volume-control">
				<button className="play-btn" onClick={togglePlay}>
					{isPlaying ? "⏸️" : "▶️"}
				</button>
				🔊
			</div>
		</div>
	);
};
