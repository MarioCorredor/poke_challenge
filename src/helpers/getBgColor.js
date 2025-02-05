export const getBgColor = (attribute, comparisonResults) => {
	if (
		comparisonResults[attribute] === true ||
		comparisonResults[attribute] === "equal"
	) {
		return "bg-green-500";
	}
	if (comparisonResults[attribute] === false) {
		return "bg-red-500";
	}

	if (comparisonResults[attribute] === "greater") {
		return "bg-red-500 arrow-up";
	}

	if (comparisonResults[attribute] === "less") {
		return "bg-red-500 arrow-down";
	}

	return "bg-transparent";
};
