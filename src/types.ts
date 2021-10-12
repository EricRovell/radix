export type RanksInput = Array<string | number>;
export type Ranks = number[];

export type Decoder = (rank: number | string) => number | string;

/**
 * Defines a decoding object.
 * Values should be a number as ranks are always numeric.
 */
export type Decodings = Record<number | string, number>;

/**
 * Defines a decoding set of options.
 */
export interface Decoding {
	decoding?: Decodings;
	decoder?: Decoder;
}

/**
 * Defines options available for constructor.
 */
export interface RadixOptions extends Decoding {
	minRanks?: number;
}