/**
 * Transforms a natural number to it's radix representation.
 */
export function toDigits(number: bigint, radix: bigint): number[] {
	let source = number;
	const ranks: number[] = [];

	if (!source) {
		return [ 0 ];
	}

	while (source) {
		ranks.push(Number(source % radix));
		source = source / radix;
	}

	return ranks
		.slice()
		.reverse();
}

/**
 * Computes a number from given digits in given radix
 */
export function fromDigits(ranks: number[], radix: number): bigint {
	return ranks.reduce((acc, rank) => {
		return BigInt(radix) * BigInt(acc) + BigInt(rank);
	}, 0n);
}

/**
 * Transforms number's radix.
 */
export function radixTransform(input: number[], radixIn: number, radixOut: number): number[] {
	return toDigits(fromDigits(input, radixIn), BigInt(radixOut));
}
