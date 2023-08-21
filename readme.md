<div align="center">
  <img src="https://github.com/TomerAberbach/lfi/blob/main/sloth.svg" alt="Sloth juggling office supplies" width="400" />
</div>

<h1 align="center">
  lfi
</h1>

<div align="center">
  <a href="https://npmjs.org/package/lfi">
    <img src="https://badgen.now.sh/npm/v/lfi" alt="version" />
  </a>
  <a href="https://github.com/TomerAberbach/lfi/actions">
    <img src="https://github.com/TomerAberbach/lfi/workflows/CI/badge.svg" alt="CI" />
  </a>
  <a href="http://img.badgesize.io/https://unpkg.com/lfi/dist/index.min.js?compression=gzip&label=gzip">
    <img src="https://unpkg.com/lfi/dist/index.min.js" alt="gzip size" />
  </a>
  <a href="http://img.badgesize.io/https://unpkg.com/lfi/dist/index.min.js?compression=brotli&label=brotli">
    <img src="https://unpkg.com/lfi/dist/index.min.js" alt="brotli size" />
  </a>
</div>

<div align="center">
  A <b>l</b>azy <b>f</b>unctional <b>i</b>teration library supporting sync, async, and concurrent iteration.
</div>

## Features

- **Lazy:** delays applying operations until their results are needed
- **Functional:** provides highly composable functions
- **Iteration:** supports sync iterables, async iterables, and unique
  _concurrent iterables_
- **Async & Concurrent:** apply async operations sequentially over async
  iterables or concurrently over _concurrent iterables_
- **Tree Shakeable:** only bundle the code you actually use!
- **Adorable Logo:** designed by [Jill Marbach](https://jillmarbach.com)!

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

## Install

```sh
$ npm i lfi
```

## Usage

Here are some examples!

Some _synchronous_ operations:

```js
import {
  filter,
  map,
  pipe,
  reduce,
  toArray,
  toGrouped,
  toMap,
  toSet,
} from 'lfi'

const messySlothDiaryEntries = [
  [`Carl`, `slept`],
  [`phil`, `ate  `],
  [`phil`, ``],
  [`CARL`, `climbed`],
  [`Frank`, `ate`],
  [`frank`, `strolled`],
  [`carl`, `Slept`],
  [`Frank`, `  `],
]

const cleanSlothDiaryEntries = pipe(
  messySlothDiaryEntries,
  map(([sloth, activity]) => [sloth, activity.trim()]),
  filter(([, activity]) => activity.length > 0),
  map(entry => entry.map(string => string.toLowerCase())),
  reduce(toArray()),
)
console.log(cleanSlothDiaryEntries)
//=> [ [ 'carl', 'slept' ], [ 'phil', 'ate' ], [ 'carl', 'climbed' ], ... ]

const uniqueActiviesPerSloth = reduce(
  toGrouped(toSet(), toMap()),
  cleanSlothDiaryEntries,
)
console.log(uniqueActiviesPerSloth)
//=> Map(3) {
//=>   'carl' => Set(2) { 'slept', 'climbed' },
//=>   'phil' => Set(1) { 'ate' },
//=>   'frank' => Set(2) { 'ate', 'strolled' }
//=> }
```

Some _sequential asynchronous_ operations:

```js
import { createReadStream } from 'fs'
import readline from 'readline'
import got from 'got'
import { chunkAsync, forEachAsync, mapAsync, pipe } from 'lfi'

const filename = `every-sloth-name.txt`

await pipe(
  readline.createInterface({
    input: createReadStream(filename, { encoding: `utf8` }),
    crlfDelay: Infinity,
  }),
  chunkAsync(4),
  mapAsync(async slothSquad => {
    const [adjective] = await got(
      `https://random-word-form.herokuapp.com/random/adjective`,
    ).json()
    return `${slothSquad.slice(0, 3).join(`, `)}, and ${
      slothSquad[slothSquad.length - 1]
    } are ${adjective}`
  }),
  forEachAsync(console.log),
)
//=> george, phil, carl, and frank are jolly!
//=> scott, jerry, ralph, and mike are infinite!
// ...
```

Some _concurrent asynchronous_ operations:

```js
import { createReadStream } from 'fs'
import readline from 'readline'
import got from 'got'
import limitConcur from 'limit-concur'
import { asConcur, chunkAsync, forEachConcur, mapConcur, pipe } from 'lfi'

const filename = `every-sloth-name.txt`

await pipe(
  readline.createInterface({
    input: createReadStream(filename, { encoding: `utf8` }),
    crlfDelay: Infinity,
  }),
  chunkAsync(4),
  // Query for the adjectives of each group concurrently rather than sequentially!
  asConcur,
  mapConcur(
    // At most 4 requests at a time!
    limitConcur(4, async slothSquad => {
      const [adjective] = await got(
        `https://random-word-form.herokuapp.com/random/adjective`,
      ).json()
      return `${slothSquad.slice(0, 3).join(`, `)}, and ${
        slothSquad[slothSquad.length - 1]
      } are ${adjective}`
    }),
  ),
  forEachConcur(console.log),
)
//=> george, phil, carl, and frank are jolly!
//=> scott, jerry, ralph, and mike are infinite!
// ...
```

## API

See the
[documentation](https://github.com/TomerAberbach/lfi/blob/main/docs/modules.md)
for the full list of available functions and classes.

All non-variadic functions are curried.

## FAQ

### What Is a Concurrent Iterable?

A concurrent iterable (represented by the
[`ConcurIterable` type](https://github.com/TomerAberbach/lfi/blob/main/docs/modules.md#concuriterable))
is a collection of values that can be iterated concurrently.

It is implemented as a function that:

- Takes a callback for handling a single value
- Returns a promise that resolves when every value has been handled

### How Do Concurrent Iterables Work?

The
[`asConcur` function](https://github.com/TomerAberbach/lfi/blob/main/docs/modules.md#asconcur)
constructs a concur iterable from a normal iterable. Here is a simplified
implementation:

```js
const asConcur = iterable => apply =>
  Promise.all(Array.from(iterable, value => apply(value)))
```

The implementation returns a function that calls the `apply` callback for each
value in the iterable and returns a promise that resolves once all values have
been handled (taking into consideration that the handling of `apply` may be
asynchronous!).

We can iterate over concur iterables:

```js
const concurIterable = asConcur([`sleep`, `climb`, `eat`])

await concurIterable(console.log)
//=> sleep
//=> climb
//=> eat
```

We can manually map and filter them:

```js
import fs from 'fs/promises'

const transformedConcurIterable = apply =>
  concurIterable(async name => {
    const contents = await fs.readFile(`${name}.txt`, `utf8`)

    if (!contents.includes(`sloth`)) {
      return
    }

    await apply(contents)
  })

await transformedConcurIterable(console.log)
```

Or we can use lfi's awesome functions to map and filter them!

```js
import fs from 'fs/promises'
import { filterConcur, forEachConcur, mapConcur, pipe } from 'lfi'

await pipe(
  concurIterable,
  mapConcur(name => fs.readFile(`${name}.txt`, `utf8`)),
  filterConcur(contents => contents.includes(`sloth`)),
  forEachConcur(console.log),
)
```

### Are Concurrent Iterables Any Different Than Chaining [`p-map`](https://github.com/sindresorhus/p-map), [`p-filter`](https://github.com/sindresorhus/p-filter), Etc.?

They are different!

- Concur iterables don't create an intermediate array for each operation:

  ```js
  import pMap from 'p-map'
  import pFilter from 'p-filter'
  import {
    asConcur,
    filterConcur,
    mapConcur,
    pipe,
    reduceConcur,
    toArray,
  } from 'lfi'

  // N - 1 intermediate arrays for N operations!
  const intermediateArray1 = await pMap(someFunction, someArray)
  const intermediateArray2 = await pFilter(
    someOtherFunction,
    intermediateArray1,
  )
  // ...
  const finalArray = await pMap(lastFunction, intermediateArrayN)

  // No intermediate arrays! No processing even happens until the call to `reduceConcur`!
  const otherFinalArray = await pipe(
    asConcur(someArray),
    mapConcur(someFunction),
    filterConcur(someOtherFunction),
    // ...
    reduceConcur(toArray()),
  )
  ```

- Concur iterables don't block values from moving down the pipeline before other
  values:

  ```js
  import pMap from 'p-map'
  import pFilter from 'p-filter'
  import {
    asConcur,
    filterConcur,
    mapConcur,
    pipe,
    reduceConcur,
    toArray,
  } from 'lfi'

  const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout))
  const mapDelays = [10, 1, 1]
  const filterDelays = [1, 1, 10]

  const array = [0, 1, 2]

  // Takes 20 seconds!
  const finalArray = await pFilter(
    await pMap(array, async index => {
      await delay(mapDelays[index] * 1000)
      return index
    }),
    async index => {
      await delay(filterDelays[index] * 1000)
      return true
    },
  )

  // Takes 11 seconds!
  const otherFinalArray = await pipe(
    asConcur(array),
    mapConcur(async index => {
      await delay(mapDelays[index] * 1000)
      return index
    }),
    filterConcur(async index => {
      await delay(filterDelays[index] * 1000)
      return true
    }),
    reduceConcur(toArray()),
  )
  ```

- Concur iterables are unordered (although, you can keep track of each value's
  initial index if that's important)

## Contributing

Stars are always welcome!

For bugs and feature requests,
[please create an issue](https://github.com/TomerAberbach/lfi/issues/new).

For pull requests, please read the
[contributing guidelines](https://github.com/TomerAberbach/lfi/blob/main/contributing.md).

## License

[Apache 2.0](https://github.com/TomerAberbach/lfi/blob/main/license)

This is not an official Google product.
