export const getBgColor = (attribute, comparisonResults) => {
	// Si el tipo1 está cruzado, marcar solo type1 en naranja
	if (attribute === "type1" && comparisonResults.type1Crossed) {
		return "bg-orange-500";
	}

	// Si el tipo2 está cruzado, marcar solo type2 en naranja
	if (attribute === "type2" && comparisonResults.type2Crossed) {
		return "bg-orange-500";
	}

	if (
		comparisonResults[attribute] === true ||
		comparisonResults[attribute] === "equal"
	) {
		return "bg-[#5ECD8E] border-[#2C6344]";
	}
	if (comparisonResults[attribute] === false) {
		return "bg-[#DC0A2D] border-[#740417]";
	}

	if (comparisonResults[attribute] === "greater") {
		return "bg-[#DC0A2D] border-[#740417] arrow-up";
	}

	if (comparisonResults[attribute] === "less") {
		return "bg-[#DC0A2D] border-[#740417] arrow-down";
	}

	return "bg-transparent";
};
