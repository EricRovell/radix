import type { RanksInput, Ranks, Decoding } from "../types";

/**
 * Decodes the ranks array according to decoding object and/or decoder function.
 */
export function decode(ranks: RanksInput, { decoding, decoder }: Decoding = {}): Ranks {
	let input = ranks;

	if (decoder) {
		input = input.map(rank => decoder(rank));
	}

	if (decoding) {
		input = input.map(rank => decoding[rank] ?? rank);
	}

	return input.map(Number);
}
