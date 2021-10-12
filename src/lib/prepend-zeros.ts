/**
 * Prepends the array with zeros to fixate the length of the array.
 */
export function prependZeros<T>(array: Array<T>, fixedLength = 0): Array<T> {
	const zeros = Math.max(fixedLength - array.length, 0);
	return zeros && fixedLength
		? [ ...new Array(zeros).fill(0), ...array ]
		: array;
}