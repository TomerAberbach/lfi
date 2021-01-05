# fn

> A tree-shakeable functional programming library with lazy sync, async, and concurrent iteration.

## Install

```sh
$ npm i @tomer/fn
```

## Usage

This package is still under active development. Until I have better documentation take a look at the following example:

```js
import { filter, join, map, pipe, repeat, take } from '@tomer/fn'

const string = 'rainbows! And unicorns!!!'

//=> RAINBOWS AND UNICORNS!!! RAINBOWS AND UNICORNS!!! RAINBOWS AND UNICORNS!!
console.log(
  pipe(
    string,
    filter(c => c !== '!'),
    map(c => c.toUpperCase()),
    join(''),
    repeat,
    map(s => `${s}!!!`),
    take(3),
    join(' ')
  )
)
```

Everything is lazy!

## Contributing

Stars are always welcome!

For bugs and feature requests, [please create an issue](https://github.com/TomerAberbach/fn/issues/new).

For pull requests, please read the [contributing guidelines](https://github.com/TomerAberbach/fn/blob/master/contributing.md).

## License

[Apache 2.0](https://github.com/TomerAberbach/fn/blob/master/license)

This is not an official Google product.
