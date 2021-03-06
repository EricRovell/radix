/**
 * Transforms a natural number to it's radix representation.
 */
function toDigits(number: number, radix: number): number[] {
	let source = number;
	const ranks: number[] = [];

	if (!source) {
		return [ 0 ];
	}

	while (source) {
		ranks.push(source % radix);
		source = Math.trunc(source / radix);
	}
	return ranks.slice().reverse();
}

/**
 * Computes a number from given digits in given radix
 */
function fromDigits(ranks: number[], radix: number) {
	return ranks.reduce((acc, rank) => radix * acc + rank, 0);
}

/**
 * Transforms number's radix.
 */
export function radixTransform(input: number[], radixIn: number, radixOut: number): number[] {
	return toDigits(fromDigits(input, radixIn), radixOut);
}