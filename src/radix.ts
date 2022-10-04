import { construct } from "./construct";
import { radixTransform } from "./lib";
import type { RanksInput, Ranks, RadixOptions } from "./types";

/**
 * Provides functionality to store, transform, and manipulate number with different radixes.
 */
export class Radix {
	private readonly checkStatus: boolean;
	private readonly digits: Ranks;
	private readonly base: number;
	private readonly options: RadixOptions;

	constructor(ranks: RanksInput = [ 0 ], radix = 2, options: RadixOptions = {}) {
		const number = construct(ranks, radix, options);
		this.checkStatus = number.valid;
		this.digits = number.ranks;
		this.base = number.radix;
		this.options = options;
	}

	/**
	 * Returns the boolean indicating whether or not the input was valid.
	 */
	get valid(): boolean {
		return this.checkStatus;
	}

	/**
	 * Returns the number's radix value.
	 */
	get radix(): number {
		return this.base;
	}

	/**
	 * Returns ranks the number consists of.
	 */
	get ranks(): number[] {
		return this.digits;
	}

	/**
	 * Returns the rank value at specified index.
	 *
	 * Index is tied to the rank's power:
	 *
	 * [1 (index = 2), 2 (index = 1), 3 (index = 0) ],
	 * as 123 = 1 * 10^2 + 2 * 10^1 + 3 * 10^0.
	 */
	rank(index: number): number {
		return this.digits[this.digits.length - index - 1];
	}

	/**
	 * Constructs a string representation with specified radix.
	 */
	toString(radix = 10, sep = ""): string {
		return this.setRadix(radix).digits.join(sep);
	}

	/**
	 * Returns the numeric decimal representation.
	 *
	 * ! Do not use when you need big integers as it returns `Number` instance.
	 */
	get decimal(): number {
		return Number(this.toString(10));
	}

	/**
	 * Changes the number's radix and returns a new `Radix` instance.
	 */
	setRadix(radix: number): Radix {
		const transformed = radixTransform(this.digits, this.radix, radix);
		return new Radix(transformed, radix, this.options);
	}

	/**
	 * Changes the value of specific rank and returns the number as new `Radix` instance.
	 */
	setRank(value = 0, rank = 0): Radix {
		if (rank < 0 || rank > this.digits.length) {
			return new Radix();
		}

		// array indexes and ranks have reverse order by comparison
		const rankIndex = this.digits.length - 1 - rank;

		return new Radix(
			this.digits.map((digit, index) => index === rankIndex ? value : digit),
			this.radix,
			this.options
		);
	}
}

/**
 * Provides functionality to store, transform, and manipulate number with different radixes.
 */
export function radix(ranks?: RanksInput, radix?: number, options?: RadixOptions): Radix {
	return new Radix(ranks, radix, options);
}
