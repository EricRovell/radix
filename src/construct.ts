import { checkNumber, decode, prependZeros } from "./lib";
import type { RanksInput, RadixOptions, Ranks } from "./types";

interface ParsedNumber {
	radix: number;
	ranks: Ranks;
	valid: boolean;
}

export function construct(ranks: RanksInput = [ 0 ], radix = 2, options: RadixOptions = {}): ParsedNumber {
	const decoded = decode(ranks, options.decode);
	const fixedLength = prependZeros(decoded, options.minRanks);
	const valid = checkNumber(fixedLength, radix);

	if (!valid) {
		return {
			valid,
			ranks: [ 0 ],
			radix: 2
		};
	}

	return {
		valid,
		ranks: fixedLength,
		radix
	};
}
