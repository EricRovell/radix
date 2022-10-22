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

## Features:

- Extendable;
- Immutable;
- No dependencies;
- Simple API;
- Types included;
- Works in a browser and Node.js;

## Motivation

JavaScript already has the [utility function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) to parse and transform numbers between different radix. But it has the limitations:

- radix value should be in range [ 2, 36 ];
- JS integers has safe treshold as [2^53 - 1](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

Of course, it is possible to use [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) instead, but coercion between numbers and BigInts are not that great.

This library use ranks array to represent a number: `[ 1, 2, 3 ] // same as 123` which makes it easier to work with such limitation. `BigInt` used for internal calculations so values above safe integer threshold won't be a problem.

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
    <code>radix(input = [ 0 ], radix = 10, options?)</code>
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

#### Input options

The valid types of input are:

- `number`: Any positive integer number, float values are considered invalid;
- `bigint`;
- `string`;
- `number[]`: Homogeneous array of integer numbers;
- `string[]`: Homogeneous array of string symbols;

`number` and `bigint` are considered to have the `radix = 10`, and this `radix` value is default.

`number[]` and `string[]` input decoded first (if such option is passed, more about soon), and after parsed as number ranks.

```ts
// integer
radix(132).getRanks(); // -> [ 1, 3, 2 ]

// bigint
radix(456n).getRanks(); // -> [ 4, 5, 6 ]

// string
radix("1234").getRanks(); // -> [ 1, 2, 3, 4 ]

// number[]
radix([ 5, 6, 7, 8 ]).getRanks(); // -> [ 5, 6, 7, 8 ]

// string[]
radix([ "1", "2", "3" ]).getRanks(); // -> [ 1, 2, 3 ]
```

#### Options

All constructor options are optional.

<details>
  <summary>
    <code>`decoding`</code>
  </summary>

  To define custom ranks decoding, provide a decodings object:

  ```ts
  import type { Decodings } from "@ericrovell/radix";

  const decodings: Decodings = {
    "A": 0,
    "B": 1,
  };

  radix([ "A", "B" ], 2, { decode: decodings }).getRanks(); // -> [ 1, 0 ]
  ```

  Also, the decoder function can be provided instead:

  ```ts
  import type { Decoder } from "@ericrovell/radix";

  const decoder: Decoder = rank => rank ? "A" : rank;

  radix([ "A", 1 ], 2, { decoder }).getRanks(); // -> [ 0, 1 ]
  ```
</details>

<details>
  <summary>
    <code>`minRanks`</code>
  </summary>

  Sets the minimal number of ranks.

  ```ts
  radix([ 1 ], 2, { minRanks: 5 }).getRanks();     // -> [ 0, 0, 0, 0, 1 ]
  radix([ 1 ], 2, { minRanks: -5 }).getRanks();    // -> [ 1 ]
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
  radix([ 1, 0, 1 ], 2).getRanks() // -> [ 1, 0, 1 ]
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
  radix([ 1, 0, 1, 0 ], 2).setRadix(10).getRanks();   // [ 1, 0 ]
  radix([ 1, 0, 1, 0 ], 2).setRadix(8).getRanks();    // [ 1, 2 ]
  radix([ 1, 0, 1, 0 ], 2).setRadix(2).getRanks();    // [ 1, 0, 1, 0 ]
  ```
</details>

<details>
  <summary>
    <code>.setRank(value = 0, rank = 0)</code>
  </summary>

  Changes the value of specific rank and returns the number as new `Radix` instance.

  Note: The index is tied to the power, read more at `.getRank()` method.

  ```ts
  radix([ 1, 0, 1 ], 2).setRank(0).getRanks()                       // -> [ 1, 0, 0 ]);
  radix([ 1, 0, 1 ], 2).setRank(1, 1).getRanks()                    // -> [ 1, 1, 1 ]);
  radix([ 4, 0, 5, 7 ], 8).setRank(7, 3).getRanks()                 // -> [ 7, 0, 5, 7 ]);
  radix([ 1, 0, 1, 0, 1, 1, 1, 0, 1 ], 2).setRank(1, 5).getRanks()  // -> [ 1, 0, 1, 1, 1, 1, 1, 0, 1 ]);
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
  Valid input options are covered [here](#input-options).

  ```ts
  radix([ 1, 1, 0 ], 2).valid        // -> true
  radix([ 0, 1, 2, 8 ], 8).valid     // -> false, rank can't be 8 for the base 8
  radix([ 1, 1, 0 ], 2).valid        // -> true
  radix([ 1, 1, 0 ], 1.5).valid      // -> false, radix should be an integer
  radix([ 0, 1, 2, 8 ], 0).valid     // -> false, radix should be a positive integer
  radix(2.5, 10).valid               // -> false, unsupported input
  radix([ 0, "1", 2, 8 ], 10).valid  // -> false, array should be homogeneous
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
  radix([ 1, 2 ], 10) + radix([ 2, 3 ], 10) // -> 35n
  ```
</details>

## Other features

### Coercion

The `Radix` instance supports coercion via `toString()` and `valueOf()` methods. The latter returns a `bigint` decimal representation.

```ts
radix([ 1, 2, 3 ], 10) + radix([ 7, 7 ], 10) // 200n
```

### Extedibility

To extend functionality for your needs, extend the `Radix` class available at the root path:

```ts
import { Radix } from "@ericrovell/radix";

class RadixExtended extends Radix {
  constructor(ranks, radix) {
    super();
    // ...
  }

  getRanksSum() {
    return this.digits.reduce(( acc, digit ) => acc + digit, 0);
  }
}

const extended = new RadixExtended([ 1, 0, 1, 0 ], 2);
extended.getRanksSum() // -> 2
```

### Iterability

The `Radix` instance can be iterated via `for ... of` loop to loop through the ranks in powers order:

```ts
import { radix } from "@ericrovell/radix";

for (const [ rank, power ] of radix([ 1, 2, 3 ])) {
  console.log(rank, power)
  // -> [ 3, 0 ], [ 2, 1, ], [ 1, 2 ]
}

for (const [ rank, power ] of radix([ 5, 4 ], 10).setRadix(2)) {
  console.log(rank, power)
  // -> [ 0, 0 ], [ 1, 1 ], [ 1, 2 ], [ 0, 3 ], [ 1, 4 ], [ 1, 5 ]
}
```

The same way the `spread` operator can be used, `Array.from()`, and all other methods and functions that operates on iterables.
