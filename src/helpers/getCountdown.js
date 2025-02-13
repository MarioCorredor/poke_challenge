export const getCountdown = (callback) => {
	const updateCountdown = () => {
		const now = new Date();
		const tomorrow = new Date(now);
		tomorrow.setDate(now.getDate() + 1);
		tomorrow.setHours(0, 0, 0, 0);

		const timeDiff = tomorrow - now;
		const hours = Math.floor(timeDiff / (1000 * 60 * 60));
		const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

		const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
		callback(formattedTime);
	};

	updateCountdown();
	const interval = setInterval(updateCountdown, 1000);

	return () => clearInterval(interval); // Devuelve la función para limpiar el intervalo cuando ya no se necesite
};
