/* eslint-disable @typescript-eslint/ban-ts-comment */
import { radix } from "../src/radix";
import { numbers } from "./fixtures";

describe("Constructor", () => {
	it("Constructs an instance", () => {
		const instance = radix([ 0 ], 2);
		// @ts-ignore
		expect(instance.base).toBe(2);
		// @ts-ignore
		expect(instance.digits).toEqual([ 0 ]);
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
		expect(radix([ 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0 ], 2).number()).toEqual("5962");
		expect(radix([ 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1 ], 2).number(10, "-")).toEqual("1-1-9-2-7");
	});
});