export type RankInput = string | number;
export type RanksInput = RankInput[];
export type Rank = number;
export type Ranks = Rank[];

export type Encodings = Record<Rank, RankInput>;
export type Encoder = (rank: Rank) => RankInput;

export type Encode = Encoder | Encodings;

export type Decodings = Record<RankInput, Rank>;
export type Decoder = (rank: RankInput) => Rank;

export type Decode = Decodings | Decoder;

/**
 * Defines options available for constructor.
 */
export interface RadixOptions {
	decode?: Decode;
	minRanks?: number;
}

export type Input =
	| number
	| bigint
	| string
	| string[]
	| number[];
