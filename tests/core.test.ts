/* eslint-disable @typescript-eslint/ban-ts-comment */
import { radix } from "../src/radix";
import { numbers } from "./fixtures";
import type { Decoder } from "../src/types";

describe("Constructor", () => {
	it("Constructs an instance", () => {
		const instance = radix([ 1, 2, 3 ], 4);
		// @ts-ignore
		expect(instance.base).toBe(4);
		// @ts-ignore
		expect(instance.digits).toEqual([ 1, 2, 3 ]);
	});
	it("Constructs an instance without radix specified", () => {
		const instance = radix([ 1, 0, 1 ]);
		// @ts-ignore
		expect(instance.base).toBe(2);
		// @ts-ignore
		expect(instance.digits).toEqual([ 1, 0, 1 ]);
	});
	it("Constructs an instance without any parameters", () => {
		const instance = radix();
		// @ts-ignore
		expect(instance.base).toBe(2);
		// @ts-ignore
		expect(instance.digits).toEqual([ 0 ]);
	});
	it("Constructs an instance with decoding option", () => {
		const decodeDict = { "A": 0, "B": 1 };
		expect(radix([ "B", "A", "B" ], 2, { decoding: decodeDict }).ranks).toEqual([ 1, 0, 1 ]);
		expect(radix([ "A", "A", "B", 3 ], 4, { decoding: decodeDict }).ranks).toEqual([ 0, 0, 1, 3 ]);
	});
	it("Constructs an instance with decoder option", () => {
		const decoder: Decoder = rank => rank === "A" ? 0 : 1;
		expect(radix([ "B", "A", "B" ], 2, { decoder }).ranks).toEqual([ 1, 0, 1 ]);
		expect(radix([ "A", "A", "B", 3 ], 4, { decoder }).ranks).toEqual([ 0, 0, 1, 1 ]);
	});
	it("Constructs an instance with decoding dictionary & decoder option", () => {
		const decoder: Decoder = rank => rank === 6 ? 4 : rank;
		const decoding = { "A": 0, "B": 1 };
		expect(radix([ "B", "A", "B", 6, 7, 9 ], 10, { decoder, decoding }).ranks).toEqual([ 1, 0, 1, 4, 7, 9 ]);
	});
});

describe("Properties", () => {
	it("Constructs a decimal number", () => {
		for (const { decimal, bases } of numbers) {
			for (const [ base, digits ] of Object.entries(bases)) {
				expect(radix(digits, Number(base)).asDecimal).toEqual(decimal);
				expect(radix(digits, Number(base)).asDecimal).toEqual(decimal);
				expect(radix(digits, Number(base)).asDecimal).toEqual(decimal);
				expect(radix(digits, Number(base)).asDecimal).toEqual(decimal);
				expect(radix(digits, Number(base)).asDecimal).toEqual(decimal);
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
		// @ts-expect-error
		expect(radix([ 0, 1, 2, -7 ], "8").valid).toBe(false);
	});
});

describe("Transformations", () => {
	it("Transforms number's radix", () => {
		for (const { bases } of numbers) {
			for (const [ base, digits ] of Object.entries(bases)) {
				expect(radix(digits, Number(base)).binary.ranks).toEqual(bases[2]);
				expect(radix(digits, Number(base)).octal.ranks).toEqual(bases[8]);
				expect(radix(digits, Number(base)).decimal.ranks).toEqual(bases[10]);
				expect(radix(digits, Number(base)).hexadecimal.ranks).toEqual(bases[16]);
				expect(radix(digits, Number(base)).sexagesimal.ranks).toEqual(bases[60]);
			}
		}
	});
	it("Transforms into the number", () => {
		expect(radix([ 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0 ], 2).toString()).toEqual("5962");
		expect(radix([ 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1 ], 2).toString(10, "-")).toEqual("1-1-9-2-7");
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