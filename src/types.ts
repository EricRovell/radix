export type RankInput = string | number
export type RanksInput = RankInput[];
export type Rank = number;
export type Ranks = Rank[];

export type Encode =
	| ((rank: Rank) => RankInput)
	| Record<Rank, RankInput>

export type Decode =
	| ((rank: RankInput) => Rank)
	| Record<RankInput, Rank>;

/**
 * Defines options available for constructor.
 */
export interface RadixOptions {
	decode?: Decode;
	minRanks?: number;
}
