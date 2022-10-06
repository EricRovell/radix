import { checkNumber, parse, prependZeros } from "./lib";
import type { Input, RadixOptions, Ranks } from "./types";

interface ParsedNumber {
	radix: number;
	ranks: Ranks;
	valid: boolean;
}

export function construct(input: Input = [ 0 ], radix = 10, options: RadixOptions = {}): ParsedNumber {
	const parsed = parse(input, options.decode);

	if (parsed && checkNumber(parsed, radix)) {
		return {
			valid: true,
			ranks: prependZeros(parsed, options.minRanks),
			radix
		};
	}

	return {
		valid: false,
		ranks: [ 0 ],
		radix: 10
	};
}
