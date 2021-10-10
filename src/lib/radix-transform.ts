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
		source = source / radix | 0;
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
export function radixTransform(input: number[], radixIn: number, radixOut: number, trimZeros = true): number[] {
	const transformed = toDigits(fromDigits(input, radixIn), radixOut);

	if (trimZeros) {
		return transformed;
	}

	return [
		...new Array(Math.max(input.length - transformed.length, 0)).fill(0),
		...transformed
	];
}