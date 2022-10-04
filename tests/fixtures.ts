interface NumberTestCase {
	decimal: number;
	bases: Record<number, number[]>;
}

export const numbers: NumberTestCase[] = [
	{
		decimal: 0,
		bases: {
			2: [ 0 ],
			8: [ 0 ],
			10: [ 0 ],
			16: [ 0 ],
			60: [ 0 ],
		}
	},
	{
		decimal: 1,
		bases: {
			2: [ 1 ],
			8: [ 1 ],
			10: [ 1 ],
			16: [ 1 ],
			60: [ 1 ],
		}
	},
	{
		decimal: 77,
		bases: {
			2: [ 1, 0, 0, 1, 1, 0, 1 ],
			8: [ 1, 1, 5 ],
			10: [ 7, 7 ],
			16: [ 4, 13 ],
			60: [ 1, 17 ],
		}
	},
	{
		decimal: 1024,
		bases: {
			2: [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			8: [ 2, 0, 0, 0 ],
			10: [ 1, 0, 2, 4 ],
			16: [ 4, 0, 0 ],
			60: [ 17, 4 ],
		}
	}
];
