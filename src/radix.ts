import { construct } from "./construct";
import { encode as translate, radixTransform } from "./lib";
import type { RanksInput, Ranks, RadixOptions, Encode } from "./types";

/**
 * Provides functionality to store, transform, and manipulate number with different radixes.
 */
export class Radix {
	#ranks: Ranks;
	#radix: number;
	#options: RadixOptions;
	#valid: boolean;

	constructor(ranks: RanksInput = [ 0 ], radix = 2, options: RadixOptions = {}) {
		const number = construct(ranks, radix, options);
		this.#valid = number.valid;
		this.#ranks = number.ranks;
		this.#radix = number.radix;
		this.#options = options;
	}

	/**
	 * Returns the numeric decimal representation.
	 *
	 * ! Do not use when you need big integers as it returns `Number` instance.
	 * Use `.valueOf()` instead.
	 */
	get decimal(): number {
		return Number(this.setRadix(10).toString());
	}

	/**
	 * Returns the number's radix value.
	 */
	get radix(): number {
		return this.#radix;
	}

	/**
	 * Returns the rank value at specified index.
	 *
	 * Index is tied to the rank's power:
	 *
	 * [1 (index = 2), 2 (index = 1), 3 (index = 0) ],
	 * as 123 = 1 * 10^2 + 2 * 10^1 + 3 * 10^0.
	 */
	getRank(index = 0): number {
		return this.#ranks[this.#ranks.length - index - 1];
	}

	/**
	 * Returns ranks the number consists of.
	 */
	getRanks(encode?: Encode) {
		return encode
			? translate(this.#ranks, encode)
			: this.#ranks;
	}

	/**
	 * Returns the boolean indicating whether or not the input was valid.
	 */
	get valid(): boolean {
		return this.#valid;
	}

	/**
	 * Constructs a string representation with specified radix.
	 */
	toString(encode?: Encode, sep = ""): string {
		return this.getRanks(encode).join(sep);
	}

	/**
	 * Changes the number's radix and returns a new `Radix` instance.
	 */
	setRadix(radix: number): Radix {
		const transformed = radixTransform(this.#ranks, this.radix, radix);
		return new Radix(transformed, radix, this.#options);
	}

	/**
	 * Changes the value of specific rank and returns the number as new `Radix` instance.
	 */
	setRank(value = 0, rank = 0): Radix {
		if (rank < 0 || rank > this.#ranks.length) {
			return new Radix();
		}

		// array indexes and ranks have reverse order by comparison
		const rankIndex = this.#ranks.length - 1 - rank;

		return new Radix(
			this.#ranks.map((digit, index) => index === rankIndex ? value : digit),
			this.radix,
			this.#options
		);
	}

	/**
	 * Returns the primitive value as the the base 10 BigInt.
	 */
	valueOf() {
		return BigInt(this.setRadix(10).toString());
	}
}

/**
 * Provides functionality to store, transform, and manipulate number with different radixes.
 */
export function radix(ranks?: RanksInput, radix?: number, options?: RadixOptions): Radix {
	return new Radix(ranks, radix, options);
}
