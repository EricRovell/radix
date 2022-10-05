export const encodingBinary = {
	0: 0,
	1: 1
};

export const encodingDecimal = {
	...binary,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
};

export const encodingHexadecimalUpper = {
	...decimal,
	10: "A",
	11: "B",
	12: "C",
	13: "D",
	14: "E",
	15: "F"
};

export const encodingHexadecimalLower = {
	...decimal,
	10: "a",
	11: "b",
	12: "c",
	13: "d",
	14: "e",
	15: "f"
};
