export const getGeneration = (generationString) => {
	const romanToNumber = (roman) => {
		const romanNumerals = {
			i: 1,
			ii: 2,
			iii: 3,
			iv: 4,
			v: 5,
			vi: 6,
			vii: 7,
			viii: 8,
			ix: 9,
			x: 10,
		};

		return romanNumerals[roman.toLowerCase()] || null; // Si no se encuentra, retorna null
	};

	const generationRoman = generationString.split("-")[1];
	return romanToNumber(generationRoman);
};
