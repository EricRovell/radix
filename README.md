<div align="center">
  <img
    alt="Abacus as symbol of representing numbers in different bases"
    src="assets/logo.svg"
    width="125px"
    height="125px"
    padding="25px"
  />
</div>

<div align="center">
  <a href="https://github.com/EricRovell/radix/actions">
    <img alt="build action status" src="https://github.com/EricRovell/radix/workflows/build/badge.svg" />
  </a>
  <a href="https://codecov.io/gh/EricRovell/radix">
    <img src="https://codecov.io/gh/EricRovell/radix/branch/main/graph/badge.svg?token=FHC119ASN8"/>
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/@ericrovell/radix">
    <img alt="npm package version" src="https://badgen.net/npm/v/@ericrovell/radix/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/radix">
    <img alt="types included" src="https://badgen.net/npm/types/@ericrovell/radix/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/radix">
    <img alt="downloads count" src="https://badgen.net/npm/dt/@ericrovell/radix/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/radix">
    <img alt="node version" src="https://badgen.net/npm/node/@ericrovell/radix/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/radix">
    <img alt="licence" src="https://badgen.net/npm/license/@ericrovell/radix/" />
  </a>
</div>

<div align="center">
  <a href="https://bundlephobia.com/package/@ericrovell/radix">
    <img alt="minified size" src="https://badgen.net/bundlephobia/min/@ericrovell/radix/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/radix">
    <img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/@ericrovell/radix/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/radix">
    <img alt="dependency count" src="https://badgen.net/bundlephobia/dependency-count/@ericrovell/radix/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/radix">
    <img alt="tree-shaking" src="https://badgen.net/bundlephobia/tree-shaking/@ericrovell/radix/" />
  </a>
</div>

# Radix

Radix is JavaScript library for [radix](https://en.wikipedia.org/wiki/Radix) transformations and manipulations.

## Motivation

### Technical

JavaScript already has the [utility function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) to parse and transform numbers between different radix. But it has the limitations:

- radix value should be in range [ 2, 36 ];
- JS integers has safe treshold as [2^53 - 1](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

Of course, it is possible to use [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) instead, but coercion between numbers and BigInts are not that great.

In this library numbers are represented by ranks as an array items `[ 1, 2, 3 ] // same as 123` what makes it easier to work with such limitation.

### Personal

The main reason for this package for exist, there are plans for small educational webapp for learning numeral bases and this package will be used here. You can see the example project [here](https://numbers-i76mhuwte.now.sh/en/welcome), it is a bit old and full of bugs. I have decided to do it better from scratch and the work begins here as a little package that might be usefull for someone else too.

## Getting started

The package is available via [npm](https://www.npmjs.com/package/@ericrovell/radix):

```
npm i @ericrovell/radix
```

```ts
import { radix } from "@ericrovell/radix";

radix([ 1, 0, 1, 0], 2).decimalNumber // -> 10
```

## API

### Constructor

<details>
  <summary>
    <code>radix(ranks, radix)</code>
  </summary>

  Constructs a number from given ranks and specified radix.

  ```ts
	radix([ 1, 0, 0, 1, 1, 0, 1 ], 2).decimalNumber // -> 77
  ```
</details>

### Properties

<details>
  <summary>
    <code>.radix</code>
  </summary>

  Returns number's [radix](https://en.wikipedia.org/wiki/Radix) value.

  ```ts
	radix([ 1, 0, 1], 2).radix // -> 2
  ```
</details>

<details>
  <summary>
    <code>.ranks</code>
  </summary>

  Returns ranks the number consists of.

  ```ts
	radix([ 1, 0, 1], 2).ranks // -> [ 1, 0, 1 ]
  ```
</details>

<details>
  <summary>
    <code>.asDecimal</code>
  </summary>

  Returns the numeric decimal representation.

  ```ts
	radix([ 1, 0, 1, 0 ], 2).asDecimal // -> 10
	radix([ 2, 4, 5 ], 8).asDecimal    // -> 165
  ```
</details>

### Manipulations

<details>
  <summary>
    <code>.number(radix = 10, sep = "")</code>
  </summary>

  Constructs a number's string representation with specified radix.

  ```ts
	radix([ 1, 0, 1, 0 ], 2).number()       // -> "10"
	radix([ 1, 0, 1, 0 ], 2).number(8)      // -> "12"
	radix([ 1, 0, 1, 0 ], 2).number(8, ",") // -> "1,2"
  ```
</details>

<details>
  <summary>
    <code>.setRadix(radix)</code>
  </summary>

  Changes the number's radix and returns a new `Radix` instance.

  ```ts
	radix([ 1, 0, 1, 0 ], 2).setRadix(10) // [ 1, 0 ]
	radix([ 1, 0, 1, 0 ], 2).setRadix(8)  // [ 1, 2 ]
	radix([ 1, 0, 1, 0 ], 2).setRadix(2)  // [ 1, 0, 1, 0 ]

    // shortcuts
	radix([ 1, 0 ], 10).binary         // [ 1, 0, 1, 0 ]
	radix([ 1, 0 ], 10).octal          // [ 1, 2 ]
	radix([ 1, 0 ], 2).decimal         // [ 2 ]
	radix([ 1, 0 ], 10).hexadecimal    // [ 10 ]
	radix([ 1, 2, 3 ], 10).sexagesimal // [ 7, 11 ]
  ```

  The are also some shortcut properties for most used radix transformations.

  ```ts
	radix([ 1, 0 ], 10).binary         // [ 1, 0, 1, 0 ]
	radix([ 1, 0 ], 10).octal          // [ 1, 2 ]
	radix([ 1, 0 ], 2).decimal         // [ 2 ]
	radix([ 1, 0 ], 10).hexadecimal    // [ 10 ]
	radix([ 1, 2, 3 ], 10).sexagesimal // [ 7, 11 ]
  ```
</details>

## Extending functionality

To extend functionality for your needs, just extend the `Radix` class available at the root path:

```ts
import { Radix } from "@ericrovell/radix";

class RadixExtended extends Radix {
  constructor(ranks, radix) {
    super();
    // ...
  }

  sum() {
    return this.digits.reduce(( acc, digit ) => acc + digit, 0);
  }
}

const extended = new RadixExtended([ 1, 0, 1, 0 ], 2);
extended.sum() // -> 2
```

## Roadmap

- [ ]: more versatile input;
- [ ]: input validation;
- [ ]: ranks mutations;
- [ ]: arithmetics;