import { toDigits } from "./radix-transform";
import { decode as translate } from "./translate";
import type { Decode, Input, Ranks } from "../types";

/**
 * Parses the input.
 */
export const parse = (input: Input, decode?: Decode): Ranks | null => {
	if (typeof input === "number" && Number.isInteger(input)) {
		const value = Math.abs(input);
		return toDigits(BigInt(value), 10n);
	}

	if (typeof input === "bigint") {
		return toDigits(input, 10n);
	}

	if (typeof input === "string") {
		return translate(input.split(""), decode);
	}

	if (Array.isArray(input) && input.length) {
		// @ts-expect-error https://github.com/microsoft/TypeScript/issues/44373
		if (input.every(item => Number.isInteger(item))) {
			return translate(input, decode);
		}

		// @ts-expect-error https://github.com/microsoft/TypeScript/issues/44373
		if (input.every(item => typeof item === "string")) {
			return translate(input, decode);
		}
	}

	return null;
};
