/**
 * Checks number's radix for valid value.
 * Radix should be positive integer.
 * No unary systems are supported as they are too primitive and complicates code too much.
 */
function checkRadix(radix: number): boolean {
	return Number.isInteger(radix) && radix > 1;
}

/**
 * Checks the number's rank.
 * Rank should non-negative integer and can't have value equal or greater than number's radix.
 */
function checkRank(rank: number, radix: number): boolean {
	return (
		Number.isInteger(rank) &&
		!isNaN(rank) &&
		rank >= 0 &&
		rank < radix
	);
}

/**
 * Checks the given number's validity.
 */
export function checkNumber(ranks: number[], radix: number): boolean {
	if (!checkRadix(radix)) {
		return false;
	}

	if (!ranks.every(rank => checkRank(rank, radix))) {
		return false;
	}

	return true;
}