export const getEvolutionStage = (data, name) => {
	const findEvolutionStage = (evolutionChain, name, stage = 1) => {
		if (evolutionChain.species === name) {
			const trigger =
				evolutionChain.evolution_details?.[0]?.trigger || "None";

			return { stage, trigger };
		}

		for (const nextEvolution of evolutionChain.evolves_to) {
			const result = findEvolutionStage(nextEvolution, name, stage + 1);
			if (result) return result;
		}

		return null;
	};

	return (
		findEvolutionStage(data.chain, name) || {
			stage: 1,
			trigger: "None",
		}
	);
};
