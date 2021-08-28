import { radixTransform } from "@util/radixTransform";
import { checkNumber } from "./lib/check-number";

/**
 * Provides functionality to store, transform, and manipulate number with different radixes.
 */
export class Radix {
	private readonly checkStatus: boolean;
	private readonly digits: number[];
	private readonly base: number;

	constructor(ranks: number[] = [ 0 ], radix = 2) {
		this.checkStatus = checkNumber(ranks, radix);
		[ this.digits, this.base ] = this.checkStatus
			? [ ranks, radix ]
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
	 * Constructs a number's string representation with specified radix.
	 */
	number(radix = 10, sep = ""): string {
		return this.setRadix(radix).digits.join(sep);
	}

	/**
	 * Returns the numeric decimal representation.
	 */
	get asDecimal(): number {
		return Number(this.number(10));
	}

	/**
	 * Changes the number's radix and returns a new `Radix` instance.
	 */
	setRadix(radix: number): Radix {
		const transformed = radixTransform(this.digits, this.radix, radix);
		return new Radix(transformed, radix);
	}

	/**
	 * Returns new `Radix` instance with the binary radix representation.
	 */
	get binary(): Radix {
		return this.setRadix(2);
	}

	/**
	 * Returns new `Radix` instance with the octal radix representation.
	 */
	get octal(): Radix {
		return this.setRadix(8);
	}

	/**
	 * Returns new `Radix` instance with the decimal radix representation.
	 */
	get decimal(): Radix {
		return this.setRadix(10);
	}

	/**
	 * Returns new `Radix` instance with the hexadecimal radix representation.
	 */
	get hexadecimal(): Radix {
		return this.setRadix(16);
	}

	/**
	 * Returns new `Radix` instance with the sexagesimal radix representation.
	 */
	get sexagesimal(): Radix {
		return this.setRadix(60);
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
export function radix(ranks?: number[], radix?: number): Radix {
	return new Radix(ranks, radix);
}