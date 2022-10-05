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

The main reason for this package for exist, there are plans for small educational webapp for learning numeral bases and this package will be used here. You can see the example project [here](https://numbers-ruby.vercel.app), it is a bit old and full of bugs. I have decided to do it better from scratch and the work begins here as a little package that might be usefull for someone else too.

You can find the new project [here](https://radix.vercel.app). It is in early stage of development and influences of the development of this package.

## Getting started

The package is available via [npm](https://www.npmjs.com/package/@ericrovell/radix):

```
npm i @ericrovell/radix
```

```ts
import { radix } from "@ericrovell/radix";

radix([ 1, 0, 1, 0], 2).decimal // -> 10
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
  radix().decimal                            // -> 0
  radix([ 1, 0, 0 ]).decimal                 // -> 4
  radix([ 1, 0, 0, 1, 1, 0, 1 ], 2).decimal  // -> 77
  radix([ 5, 0 ], 2).decimal                 // -> 0, invalid input
  ```
</details>

#### Options

All options are optional.

<details>
  <summary>
    <code>`decoding = undefined`</code>
  </summary>

  To define custom ranks decoding, provide a decodings object:

  ```ts
  import type { Decodings } from "@ericrovell/radix";

  const decodings: Decodings = {
    "A": 0,
    "B": 1,
  };

  radix([ "A", "B" ], 2, { decode: decodings }).ranks(); // -> [ 1, 0 ]
  ```

  Also, the decoder function can be provided instead:

  ```ts
  import type { Decoder } from "@ericrovell/radix";

  const decoder: Decoder = rank => rank ? "A" : rank;

  radix([ "A", 1 ], 2, { decoder }).ranks(); // -> [ 0, 1 ]
  ```
</details>

<details>
  <summary>
    <code>`minRanks = undefined`</code>
  </summary>

  Sets the minimal number of ranks.

  ```ts
  radix([ 1 ], 2, { minRanks: 5 }).ranks;     // -> [ 0, 0, 0, 0, 1 ]
  radix([ 1 ], 2, { minRanks: -5 }).ranks;    // -> [ 1 ]
  radix([ 1, 2, 3, 4 ], 10, { minRanks: 3 }); // -> [ 1, 2, 3, 4 ]
  ```
</details>

### Methods and properties

<details>
  <summary>
    <code>.decimal</code>
  </summary>

  Returns the numeric decimal representation.

  ```ts
  radix([ 1, 0, 1, 0 ], 2).decimal // -> 10
  radix([ 2, 4, 5 ], 8).decimal    // -> 165
  ```

  Do not use if the decimal value may exceed the safe integer value as it returns `Number` instance which is not safe.
  Use `.valueOf()` instead.
</details>

<details>
  <summary>
    <code>.getRanks(encode?: Encode)</code>
  </summary>

  Returns ranks the number consists of.

  ```ts
  radix([ 1, 0, 1], 2).ranks // -> [ 1, 0, 1 ]
  ```

  The output may be encoded using the `encode` argument.

  Encoding using the the encodings object:

  ```ts
  import type { Encodings } from "@ericrovell/radix";

  const binary = {
    0: "A",
    1: "B"
  };

  radix([ 1, 0, 1, 0 ], 2).toString(binary)  // -> [ "B", "A, "B", "A ]
  ```

  Encoding using the the encoder function:

  ```ts
  import type { Encoder } from "@ericrovell/radix";

  const binaryEncoder: Encoder = rank => {
    return rank === 0 ? "A" : "B"
  };

  radix([ 1, 0, 1, 0 ], 2).toString(binaryEncoder)  // -> [ "B", "A, "B", "A ]
  ```
</details>

<details>
  <summary>
    <code>.getRank(index = 0)</code>
  </summary>

  Returns the rank value at specified index.

	Index is tied to the rank's power:

  $$ 1234 = 1 * 10^3 + 2 * 10^2 + 3 * 10^1 + 4 * 10^0$$

  Here, the last rank value *4* has a power of *0*, that's how index is calculated.

  ```ts
  const number = radix([ 1, 2, 3, 4 ], 10)

  number.rank(0); // -> 4
  number.rank(3); // -> 1
  ```
</details>

<details>
  <summary>
    <code>.radix</code>
  </summary>

  Returns number's [radix](https://en.wikipedia.org/wiki/Radix) value.

  ```ts
  radix([ 1, 0, 1 ], 2).radix // -> 2
  ```
</details>

<details>
  <summary>
    <code>.setRadix(radix)</code>
  </summary>

  Changes the number's radix and returns a new `Radix` instance.

  ```ts
  radix([ 1, 0, 1, 0 ], 2).setRadix(10);        // [ 1, 0 ]
  radix([ 1, 0, 1, 0 ], 2).setRadix(8);         // [ 1, 2 ]
  radix([ 1, 0, 1, 0 ], 2).setRadix(2);         // [ 1, 0, 1, 0 ]
  ```
</details>

<details>
  <summary>
    <code>.setRank(value = 0, rank = 0)</code>
  </summary>

  Changes the value of specific rank and returns the number as new `Radix` instance.

  Note: The index is tied to the power, read more at `.getRank()` method.

  ```ts
  radix([ 1, 0, 1 ], 2).setRank(0).ranks                       // -> [ 1, 0, 0 ]);
  radix([ 1, 0, 1 ], 2).setRank(1, 1).ranks                    // -> [ 1, 1, 1 ]);
  radix([ 4, 0, 5, 7 ], 8).setRank(7, 3).ranks                 // -> [ 7, 0, 5, 7 ]);
  radix([ 1, 0, 1, 0, 1, 1, 1, 0, 1 ], 2).setRank(1, 5).ranks  // -> [ 1, 0, 1, 1, 1, 1, 1, 0, 1 ]);
  ```
</details>

<details>
  <summary>
    <code>.toString(encode?: Encode, sep = "")</code>
  </summary>

  Constructs a number's string representation.

  ```ts
  radix([ 2, 3, 4 ], 10).toString()       // -> "234"
  ```

  The custom encoding can be specified using the encodings object or encoder function, same as `.getRanks()` method.

  ```ts
  import type { Encodings, Encoder } from "@ericrovell/radix";

  const binary = {
    0: "A",
    1: "B"
  };

  const binaryEncoder: Encoder = rank => {
    return rank === 0 ? "A" : "B"
  };

  radix([ 1, 0, 1, 0 ], 2).toString(binary)  // -> "BABA"
  radix([ 1, 0, 1, 0 ], 2).toString(binaryEncoder)  // -> "BABA"
  ```

  To define a separator, provide a second argument:

  ```ts
  radix([ 1, 0, 1, 0 ], 2).toString(undefined, "+")  // -> "1+0+1+0"
  ```
</details>

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
    <code>.valueOf()</code>
  </summary>

  Returns the primitive value as decimal radix `BigInt` value.

  ```ts
  radix([ 2, 3 ], 10).valueOf() // -> 23n
  ```

  Method may be useful for coercion:

  ```ts
  radix([ 1, 2 ], 10) + radix([ 2, 3 ], 10) // 35n
  ```
</details>

## Encodings

A list of predefined encodings available for import:

- encodingBinary;
- encodingDecimal;
- encodingHexadecimalUpper;
- encodingHexadecimalLower;

```ts
import { radix, encodingHexadecimalUpper } from "@ericrovell/radix";

radix([ 5, 6, 4, 6, 5, 4 ], 10)
  .setRadix(16)
  .toString(encodingHexadecimalUpper); // 89DAE
```

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
