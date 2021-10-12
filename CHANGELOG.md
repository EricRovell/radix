# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.6.1](https://github.com/ericrovell/radix/compare/v0.6.0...v0.6.1) (2021-10-12)


### Bug Fixes

* `.setRadix()` and `.setRank()` inherit the constructor options ([1bfd5c8](https://github.com/ericrovell/radix/commit/1bfd5c8b02945237a0e40b613c60e698f68d1a4e))

## [0.6.0](https://github.com/ericrovell/radix/compare/v0.5.1...v0.6.0) (2021-10-12)


### ⚠ BREAKING CHANGES

* `.setRadix()` method does not have optional `trimZeros` argument.

### Features

* **helper:** `prependZeros` helper function ([5a8c0c4](https://github.com/ericrovell/radix/commit/5a8c0c4d7c069d698cd9949ddc86eea713746692))
* supporing `minRanks` constructor option ([fdaaa26](https://github.com/ericrovell/radix/commit/fdaaa26bcd843dad0a0e58578f548690d50bfe9b))


### revert

* revert `trimZeros` argument ([2ceb39c](https://github.com/ericrovell/radix/commit/2ceb39c226a9a0664d78768cbf5d92809d99967d))

### 0.5.1 (2021-10-11)


### Bug Fixes

* expose `Ranks` types ([b6640a3](https://github.com/ericrovell/radix/commit/b6640a3123696a3f57e5b6d98a3a04a77f899810))
* old method name typo ([9c11991](https://github.com/ericrovell/radix/commit/9c119916c8cbddd2b571865c59975f1a914869d2))
* wrong radix-transform result caused by rounding ([9bbc873](https://github.com/ericrovell/radix/commit/9bbc8739dcc99cfadccf48fdec2270c3ce4b8f81))

# 0.5.0 (2021-10-10)

- [feature]: `.rank(index)` method for getting power indexes;
- [feature]: `setRadix()` method `trimZeros` optional parameter;
- [fix]: expose `package.json`;
- [fix]: expose `Ranks` typings;

# 0.4.0 (2021-10-01)

- [breaking]: `.number()` method was renamed to `.toString()`;
- [feature]: ranks custom decoding options;
- [breaking]: removed aliases for `.setRadix()` method properties;
- [breaking]: renamed `.asDecimal` property to `.decimal`;

# 0.3.0 (2021-08-28)

- [improvement]: default `radix` constructor arguments as binary zero;
- [feature]: `.setRank(value, rank)` method for ranks manipulations;

## 0.2.0 (2021-08-28)

- [improvement]: validating the input with fallback value;
- [feature]: `.valid` method for validation status information;

## 0.1.1 (2021-08-25)

- Fixed ESM Module path;

## 0.1.0 (2021-08-23)

- Basic API;