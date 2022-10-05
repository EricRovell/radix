import type { RanksInput, Ranks, Encode, Decode } from "../types";

/**
 * TODO: refactor into 1 function,
 * Don't know how to manage types correctly.
 */

/**
 * Encodes the ranks array according to the dictionary object or encoder function.
 */
export function encode(ranks: Ranks, translator: Encode): RanksInput {
	if (translator && typeof translator === "function") {
		return ranks.map(rank => translator(rank));
	}

	if (translator && typeof translator === "object") {
		return ranks.map(rank => translator[rank] ?? rank);
	}

	return ranks.map(Number);
}

/**
 * Decodes the ranks array according to the dictionary object or decoder function.
 */
export function decode(ranks: RanksInput, translator?: Decode): Ranks {
	if (translator && typeof translator === "function") {
		return ranks.map(rank => translator(rank));
	}

	if (translator && typeof translator === "object") {
		return ranks.map(rank => translator[rank] ?? rank);
	}

	return ranks.map(Number);
}
