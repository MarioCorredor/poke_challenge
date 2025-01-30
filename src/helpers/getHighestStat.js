export const getHighestStat = (stats) => {
	const statNames = {
		hp: "HP",
		attack: "Atk",
		defense: "Def",
		"special-attack": "SpAtk",
		"special-defense": "SpDef",
		speed: "Speed",
	};

	let highestStat = "";
	let highestValue = 0;

	for (const [key, value] of Object.entries(stats)) {
		if (value > highestValue) {
			highestValue = value;
			highestStat = statNames[key] || key;
		}
	}

	return highestStat;
};
