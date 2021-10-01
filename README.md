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

radix([ 1, 0, 1, 0], 2).asDecimal // -> 10
```

## API

### Constructor

<details>
  <summary>
    <code>radix(ranks = [ 0 ], radix = 2, options?)</code>
  </summary>

  Constructs a number from given ranks and specified radix.
  The input is validated, more about the validation rules in `.valid` property description.

  In case of invalid input the fallback is number 0 in binary system.

  ```ts
  radix().asDecimal                           // -> 0
  radix([ 1, 0, 0 ]).asDecimal                // -> 4
  radix([ 1, 0, 0, 1, 1, 0, 1 ], 2).asDecimal // -> 77
  radix([ 5, 0 ], 2).asDecimal                // -> 0, invalid input
  ```
</details>

#### Decoding

To define custom ranks decoding, provide a decodings object to the constructor options.

```ts
import type { Decodings } from "@ericrovell/radix";

const decoding: Decodings = {
  "A": 0,
  "B": 1,
};

radix([ "A", "B" ], 2, { decoding }).ranks(); // -> [ 1, 0 ]
radix([ "A", "B", 7 ], 10, { decoding }).ranks(); // -> [ 1, 0, 7 ]
```

#### Decoder

To define functional custom ranks decoding, provide a function to the constructor options. 

```ts
import type { Decoder } from "@ericrovell/radix";

const decoder: Decoder = rank => rank ? "A" : rank;

radix([ "A", 1 ], 2, { decoder }).ranks(); // -> [ 0, 1 ]
```

Decoder and decodings can be used simultaniously, at the end of the process each rank converted to numeric type:

`input ranks` -> `decoder` -> `decodings` -> `Number constructor` -> `numeric ranks`.

### Representation

<details>
  <summary>
    <code>.toString(radix = 10, sep = "")</code>
  </summary>

  Constructs a string representation with specified radix and separator.

  ```ts
  radix([ 1, 0, 1, 0 ], 2).toString()       // -> "10"
  radix([ 1, 0, 1, 0 ], 2).toString(8)      // -> "12"
  radix([ 1, 0, 1, 0 ], 2).toString(8, ",") // -> "1,2"
  ```
</details>

<details>
  <summary>
    <code>.decimal</code>
  </summary>

  Returns the numeric decimal representation.

  ```ts
  radix([ 1, 0, 1, 0 ], 2).decimal // -> 10
  radix([ 2, 4, 5 ], 8).decimal    // -> 165
  ```

  Do not use if the decimal value exceed the safe integer value as it returns `Number` instance, not `BigInt`.
  Instead, create `BigInt` instances from string representation:

  ```ts
  const numberAsString = radix([ 2, 0, 1 ], 100).toString(10);
  const number = BigInt(numberAsString);
  ```
</details>

### Properties

<details>
  <summary>
    <code>.valid</code>
  </summary>

  Returns the boolean indicating whether or not the input was valid.

  Radix should be positive integer equal or larger than 2. Unary base system's are not supported.
  It complicated the code too much and too primitive to be practical.

  Each rank should be non-negative integer and have a value less than radix.

  ```ts
  radix([ 1, 1, 0 ], 2).valid    // -> true
  radix([ 0, 1, 2, 8 ], 8).valid // -> false, rank can't be 8 for the base 8
  radix([ 1, 1, 0 ], 2).valid    // -> true
  radix([ 1, 1, 0 ], 1.5).valid  // -> false, radix should be an integer
  radix([ 0, 1, 2, 8 ], 0).valid // -> false, radix should be a positive integer
  ```
</details>

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

### Manipulations

<details>
  <summary>
    <code>.setRadix(radix)</code>
  </summary>

  Changes the number's radix and returns a new `Radix` instance.

  ```ts
  radix([ 1, 0, 1, 0 ], 2).setRadix(10) // [ 1, 0 ]
  radix([ 1, 0, 1, 0 ], 2).setRadix(8)  // [ 1, 2 ]
  radix([ 1, 0, 1, 0 ], 2).setRadix(2)  // [ 1, 0, 1, 0 ]
  ```
</details>

<details>
  <summary>
    <code>.setRank(value = 0, rank = 0)</code>
  </summary>

  Changes the value of specific rank and returns the number as new `Radix` instance.

  ```ts
  radix([ 1, 0, 1 ], 2).setRank(0).ranks                      // -> [ 1, 0, 0 ]);
  radix([ 1, 0, 1 ], 2).setRank(1, 1).ranks                   // -> [ 1, 1, 1 ]);
  radix([ 4, 0, 5, 7 ], 8).setRank(7, 3).ranks                // -> [ 7, 0, 5, 7 ]);
  radix([ 1, 0, 1, 0, 1, 1, 1, 0, 1 ], 2).setRank(1, 5).ranks // -> [ 1, 0, 1, 1, 1, 1, 1, 0, 1 ]);
  ```

  Note: remember, that ranks and array indexes have the reversed order. Ranks order increments to the left:

  123 = 1 * 10^**2** + 2 * 10^**1** + 3 * 10^**0**
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

- [x] input validation;
- [x] ranks mutations;
- [x] decoding;
- [ ] encoding;
- [ ] trim zeros;
- [ ] arithmetics;
- [ ] user defined ranks dictionaries;