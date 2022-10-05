import { describe, expect, it } from "vitest";

import { radix } from "../src/radix";
import { numbers } from "./fixtures";
import type { Decode, Encode, Rank } from "../src/types";

describe("Constructor", () => {
	it("Constructs an instance", () => {
		const instance = radix([ 1, 2, 3 ], 4);
		expect(instance.radix).toBe(4);
		expect(instance.ranks).toEqual([ 1, 2, 3 ]);
	});
	it("Constructs an instance without radix specified", () => {
		const instance = radix([ 1, 0, 1 ]);
		expect(instance.radix).toBe(2);
		expect(instance.ranks).toEqual([ 1, 0, 1 ]);
	});
	it("Constructs an instance without any parameters", () => {
		const instance = radix();
		expect(instance.radix).toBe(2);
		expect(instance.ranks).toEqual([ 0 ]);
	});
	it("Constructs an instance with decoding option", () => {
		const decode = { "A": 0, "B": 1 };
		expect(radix([ "B", "A", "B" ], 2, { decode }).ranks).toEqual([ 1, 0, 1 ]);
		expect(radix([ "A", "A", "B", 3 ], 4, { decode }).ranks).toEqual([ 0, 0, 1, 3 ]);
	});
	it("Constructs an instance with decoder option", () => {
		const decode: Decode = rank => rank === "A" ? 0 : 1;
		expect(radix([ "B", "A", "B" ], 2, { decode }).ranks).toEqual([ 1, 0, 1 ]);
		expect(radix([ "A", "A", "B", 3 ], 4, { decode }).ranks).toEqual([ 0, 0, 1, 1 ]);
	});
	it("Constructs an instance with fixed minimal number of ranks option", () => {
		expect(radix([ 1 ], 2, { minRanks: 5 }).ranks).toEqual([ 0, 0, 0, 0, 1 ]);
		expect(radix([ 1 ], 2, { minRanks: -5 }).ranks).toEqual([ 1 ]);
		expect(radix([ 1, 2, 3, 4 ], 10, { minRanks: 3 }).ranks).toEqual([ 1, 2, 3, 4 ]);
	});
});

describe("Properties", () => {
	it("Constructs a decimal number", () => {
		for (const { decimal, bases } of numbers) {
			for (const [ base, digits ] of Object.entries(bases)) {
				expect(radix(digits, Number(base)).decimal).toBe(decimal);
				expect(radix(digits, Number(base)).decimal).toBe(decimal);
				expect(radix(digits, Number(base)).decimal).toBe(decimal);
				expect(radix(digits, Number(base)).decimal).toBe(decimal);
				expect(radix(digits, Number(base)).decimal).toBe(decimal);
			}
		}
	});
	it("Checks if the input ranks are correct", () => {
		expect(radix([ 1, 1, 0 ], 2).valid).toBe(true);
		expect(radix([ 0, 1, 2, 8 ], 8).valid).toBe(false);
		expect(radix([ 0, 1, 2, -7 ], 8).valid).toBe(false);
		expect(radix([ 0, 1.5, 2, 4 ], 8).valid).toBe(false);
	});
	it("Checks if the input radix is correct", () => {
		expect(radix([ 1, 1, 0 ], 2).valid).toBe(true);
		expect(radix([ 1, 1, 0 ], 1.5).valid).toBe(false);
		expect(radix([ 0, 1, 2, 8 ], 0).valid).toBe(false);
		expect(radix([ 0, 1, 2, 8 ], 1).valid).toBe(false);
		expect(radix([ 0, 1, 2, 8 ], -1).valid).toBe(false);
		// @ts-expect-error test case
		expect(radix([ 0, 1, 2, -7 ], "8").valid).toBe(false);
	});
	it("Returns the rank value at specified index", () => {
		expect(radix([ 1, 2, 3, 4, 5, 6 ], 10).rank(0)).toBe(6);
		expect(radix([ 1, 2, 3, 4, 5, 6 ], 10).rank(3)).toBe(3);
		expect(radix([ 1, 2, 3, 4, 5, 6 ], 10).rank(5)).toBe(1);
	});
});

describe("Transformations", () => {
	it("Transforms number's radix", () => {
		for (const { bases } of numbers) {
			for (const [ base, digits ] of Object.entries(bases)) {
				expect(radix(digits, Number(base)).setRadix(2).ranks).toEqual(bases[2]);
				expect(radix(digits, Number(base)).setRadix(8).ranks).toEqual(bases[8]);
				expect(radix(digits, Number(base)).setRadix(10).ranks).toEqual(bases[10]);
				expect(radix(digits, Number(base)).setRadix(16).ranks).toEqual(bases[16]);
				expect(radix(digits, Number(base)).setRadix(60).ranks).toEqual(bases[60]);
			}
		}
		/**
		 * Caught a bug with this test case:
		 *
		 * Used in radix transform:
		 * 	source / radix | 0 and it led to wrong result.
		 */
		expect(radix([ 7, 6, 2, 1, 1, 7, 7, 5, 5, 5 ], 10).setRadix(2).ranks).toEqual([ 1,1,1,0,0,0,1,1,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,0,1,0,0,1,1 ]);
	});
	it("Changes the rank of the number", () => {
		expect(radix([ 1, 0, 1 ], 2).setRank().ranks).toEqual([ 1, 0, 0 ]);
		expect(radix([ 1, 0, 1 ], 2).setRank(0).ranks).toEqual([ 1, 0, 0 ]);
		expect(radix([ 1, 0, 1 ], 2).setRank(1, 1).ranks).toEqual([ 1, 1, 1 ]);
		expect(radix([ 4, 0, 5, 7 ], 8).setRank(7, 3).ranks).toEqual([ 7, 0, 5, 7 ]);
		expect(radix([ 1, 0, 1, 0, 1, 1, 1, 0, 1 ], 2).setRank(1, 5).ranks).toEqual([ 1, 0, 1, 1, 1, 1, 1, 0, 1 ]);
		// invalid changes
		expect(radix([ 1, 0, 1 ], 2).setRank(4, 1).ranks).toEqual([ 0 ]);
		expect(radix([ 1, 0, 1 ], 2).setRank(1, 8).ranks).toEqual([ 0 ]);
		expect(radix([ 1, 0, 1 ], 2).setRank(1, -1).ranks).toEqual([ 0 ]);
		expect(radix([ 1, 2, 3 ], 4).setRank(5).ranks).toEqual([ 0 ]);
	});
});

describe("String output", () => {
	it("Output number into string", () => {
		expect(radix([ 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0 ], 2).toString()).toEqual("1011101001010");
	});
	it("Output number into string with separator", () => {
		expect(radix([ 7, 0, 2, 3, 5, 7 ], 8).toString(undefined, "-")).toEqual("7-0-2-3-5-7");
	});
	it("Encodes the ranks using a dictionary", () => {
		const encodings = { "0": "A", "1": "B" };
		expect(radix([ 1, 0 ], 2).toString(encodings)).toBe("BA");
	});
	it("Encodes the ranks using an encoder function", () => {
		const encode: Encode = (rank: Rank) => {
			if (rank === 0) return "A";
			if (rank === 1) return "B";
			return "C";
		};
		expect(radix([ 1, 0 ], 2).toString(encode)).toBe("BA");
	});
	it("Encodes the ranks using a dictionary with separator option", () => {
		const encodings = { "0": "A", "1": "B" };
		expect(radix([ 1, 0 ], 2).toString(encodings, "+")).toBe("B+A");
	});
	it("Encodes the ranks using an encoder function with separator option", () => {
		const encode: Encode = (rank: Rank) => {
			if (rank === 0) return "A";
			if (rank === 1) return "B";
			return "C";
		};
		expect(radix([ 1, 0 ], 2).toString(encode, "+")).toBe("B+A");
	});
});

describe("Array output", () => {
	it("Output number into array", () => {
		expect(radix([ 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0 ], 2).toArray()).toEqual([ 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0 ]);
	});
	it("Output number into array using encoding dictionary", () => {
		const encodings = { "0": "A", "1": "B" };
		expect(radix([ 1, 0 ], 2).toArray(encodings)).toEqual([ "B", "A" ]);
	});
	it("Output number into array using encoder function", () => {
		const encode: Encode = (rank: Rank) => {
			if (rank === 0) return "A";
			if (rank === 1) return "B";
			return "C";
		};
		expect(radix([ 1, 0 ], 2).toArray(encode)).toEqual([ "B", "A" ]);
	});
});

describe("Unsafe Integer Values", () => {
	it("Preserves the value of unsafe integer values", () => {
		const number = BigInt(Number.MAX_SAFE_INTEGER) ** BigInt(100);
		const ranks = number
			.toString()
			.split("")
			.map(Number);

		// unsafe value is transformed back and forth, should be the same in result
		const input = radix(ranks, 10)
			.setRadix(60)
			.setRadix(2)
			.setRadix(8)
			.setRadix(10);

		expect(ranks).toEqual(input.ranks);
	});
});

describe("Primitive value", () => {
	it("Calculates the primitive value", () => {
		expect(radix([ 1, 2, 3 ], 10).valueOf()).toBe(BigInt(123));
	});
	it("Operates with the primitive values", () => {
		const input1 = radix([ 1, 2, 3 ], 10);
		const input2 = radix([ 7, 7 ], 10);
		// @ts-expect-error valueOf
		expect(input1 + input2).toBe(BigInt(200));
	});
});
