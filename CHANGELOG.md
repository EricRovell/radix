# Changelog

## Unreleased

- [enhancement]: `BigInt` used internally for ranks transformations to preserve the correct value even for unsafe integer values;
- [feat]: `encode` option available via `.toString(encode?, sep = "")` and `.toArray(encode?)` methods;
- [breaking]: remove `radix` option from `toString()` method;
- [feat]: `.toArray(encode?)` method;
- [feat]: `.valueOf()` method for calculating primitive values;
- [enhancement]: using native private class properties;
- [feat]: provide custom encodings preset;

## [0.6.1] (2021-10-12)

- [fix]: `.setRadix()` and `.setRank()` inherit the constructor options ([1bfd5c8](https://github.com/ericrovell/radix/commit/1bfd5c8b02945237a0e40b613c60e698f68d1a4e))

## [0.6.0] (2021-10-12)

- [breaking]: `.setRadix()` method does not have optional `trimZeros` argument.
- [feature]: `prependZeros` helper function ([5a8c0c4](https://github.com/ericrovell/radix/commit/5a8c0c4d7c069d698cd9949ddc86eea713746692))
- [feature]: supporing `minRanks` constructor option ([fdaaa26](https://github.com/ericrovell/radix/commit/fdaaa26bcd843dad0a0e58578f548690d50bfe9b))
- [revert]: revert `trimZeros` argument ([2ceb39c](https://github.com/ericrovell/radix/commit/2ceb39c226a9a0664d78768cbf5d92809d99967d))

## 0.5.1 (2021-10-11)

* expose `Ranks` types ([b6640a3](https://github.com/ericrovell/radix/commit/b6640a3123696a3f57e5b6d98a3a04a77f899810))
* old method name typo ([9c11991](https://github.com/ericrovell/radix/commit/9c119916c8cbddd2b571865c59975f1a914869d2))
* wrong radix-transform result caused by rounding ([9bbc873](https://github.com/ericrovell/radix/commit/9bbc8739dcc99cfadccf48fdec2270c3ce4b8f81))

## 0.5.0 (2021-10-10)

- [feature]: `.rank(index)` method for getting power indexes;
- [feature]: `setRadix()` method `trimZeros` optional parameter;
- [fix]: expose `package.json`;
- [fix]: expose `Ranks` typings;

## 0.4.0 (2021-10-01)

- [breaking]: `.number()` method was renamed to `.toString()`;
- [feature]: ranks custom decoding options;
- [breaking]: removed aliases for `.setRadix()` method properties;
- [breaking]: renamed `.asDecimal` property to `.decimal`;

## 0.3.0 (2021-08-28)

- [improvement]: default `radix` constructor arguments as binary zero;
- [feature]: `.setRank(value, rank)` method for ranks manipulations;

## 0.2.0 (2021-08-28)

- [improvement]: validating the input with fallback value;
- [feature]: `.valid` method for validation status information;

## 0.1.1 (2021-08-25)

- Fixed ESM Module path;

## 0.1.0 (2021-08-23)

- Basic API;
