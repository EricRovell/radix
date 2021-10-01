import { radixTransform, checkNumber, decode } from "@lib";
import type { RanksInput, Ranks, RadixOptions } from "./types";

/**
 * Provides functionality to store, transform, and manipulate number with different radixes.
 */
export class Radix {
	private readonly checkStatus: boolean;
	private readonly digits: Ranks;
	private readonly base: number;

	constructor(ranks: RanksInput = [ 0 ], radix = 2, options: RadixOptions = {}) {
		const decoded = decode(ranks, options);
		this.checkStatus = checkNumber(decoded, radix);
		[ this.digits, this.base ] = this.checkStatus
			? [ decoded, radix ]
			: [ [ 0 ], 2 ];
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
	setRadix(radix: number, trimZeros = true): Radix {
		const transformed = radixTransform(this.digits, this.radix, radix, trimZeros);
		return new Radix(transformed, radix);
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
			this.radix
		);
	}
}

/**
 * Provides functionality to store, transform, and manipulate number with different radixes.
 */
export function radix(ranks?: RanksInput, radix?: number, options?: RadixOptions): Radix {
	return new Radix(ranks, radix, options);
}