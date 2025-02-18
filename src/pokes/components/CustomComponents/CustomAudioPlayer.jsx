import React, { useRef, useState } from "react";
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
	};

	const handleAudioEnded = () => {
		setIsPlaying(false);
	};

	return (
		<div className="audio-player">
			<audio ref={audioRef} src={src} onEnded={handleAudioEnded} />
			<input
				className="slider-volume"
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={volume}
				onChange={handleVolumeChange}
			/>
			<div className="volume-control">
				🔊
				<button className="play-btn" onClick={togglePlay}>
					{isPlaying ? (
						<img src="/src/assets/stop_button.png" height="64" width="64" />
					) : (
						<img src="/src/assets/play_button.png" height="64" width="64"/>
					)}
				</button>
			</div>
		</div>
	);
};
