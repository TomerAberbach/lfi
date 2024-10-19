[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / reduceConcur

# Function: reduceConcur()

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

## Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

## reduceConcur(asyncReducer, concurIterable)

> **reduceConcur**\<`Value`, `Acc`, `Finished`, `This`\>(`asyncReducer`, `concurIterable`): `Promise`\<`Finished`\>

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

### Type Parameters

• **Value**

• **Acc**

• **Finished**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncReducerWithFinish`](../type-aliases/RawAsyncReducerWithFinish.md)\<`Value`, `Acc`, `Finished`, `This`\> \| [`RawReducerWithFinish`](../type-aliases/RawReducerWithFinish.md)\<`Value`, `Acc`, `Finished`, `This`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

`Promise`\<`Finished`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

### Defined in

[reduce.d.ts:232](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L232)

## reduceConcur(asyncReducer)

> **reduceConcur**\<`Value`, `Acc`, `Finished`, `This`\>(`asyncReducer`): (`concurIterable`) => `Promise`\<`Finished`\>

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

### Type Parameters

• **Value**

• **Acc**

• **Finished**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncReducerWithFinish`](../type-aliases/RawAsyncReducerWithFinish.md)\<`Value`, `Acc`, `Finished`, `This`\> \| [`RawReducerWithFinish`](../type-aliases/RawReducerWithFinish.md)\<`Value`, `Acc`, `Finished`, `This`\>

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

`Promise`\<`Finished`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

### Defined in

[reduce.d.ts:238](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L238)

## reduceConcur(asyncReducer, concurIterable)

> **reduceConcur**\<`Value`, `Acc`, `This`\>(`asyncReducer`, `concurIterable`): `Promise`\<`Acc`\>

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

### Type Parameters

• **Value**

• **Acc**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncReducerWithoutFinish`](../type-aliases/RawAsyncReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\> \| [`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

`Promise`\<`Acc`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

### Defined in

[reduce.d.ts:244](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L244)

## reduceConcur(asyncReducer)

> **reduceConcur**\<`Value`, `Acc`, `This`\>(`asyncReducer`): (`concurIterable`) => `Promise`\<`Acc`\>

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

### Type Parameters

• **Value**

• **Acc**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncReducerWithoutFinish`](../type-aliases/RawAsyncReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\> \| [`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\>

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

`Promise`\<`Acc`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

### Defined in

[reduce.d.ts:250](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L250)

## reduceConcur(asyncReducer, concurIterable)

> **reduceConcur**\<`Value`, `Finished`, `This`\>(`asyncReducer`, `concurIterable`): [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Finished`\>

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

### Type Parameters

• **Value**

• **Finished**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncOptionalReducerWithFinish`](../type-aliases/RawAsyncOptionalReducerWithFinish.md)\<`Value`, `Finished`, `This`\> \| [`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`, `Finished`, `This`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Finished`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

### Defined in

[reduce.d.ts:256](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L256)

## reduceConcur(asyncReducer)

> **reduceConcur**\<`Value`, `Finished`, `This`\>(`asyncReducer`): (`concurIterable`) => [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Finished`\>

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

### Type Parameters

• **Value**

• **Finished**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncOptionalReducerWithFinish`](../type-aliases/RawAsyncOptionalReducerWithFinish.md)\<`Value`, `Finished`, `This`\> \| [`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`, `Finished`, `This`\>

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Finished`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

### Defined in

[reduce.d.ts:262](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L262)

## reduceConcur(asyncReducer, concurIterable)

> **reduceConcur**\<`Value`, `This`\>(`asyncReducer`, `concurIterable`): [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

### Type Parameters

• **Value**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncOptionalReducerWithoutFinish`](../type-aliases/RawAsyncOptionalReducerWithoutFinish.md)\<`Value`, `This`\> \| [`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`, `This`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

### Defined in

[reduce.d.ts:268](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L268)

## reduceConcur(asyncReducer)

> **reduceConcur**\<`Value`, `This`\>(`asyncReducer`): (`concurIterable`) => [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

### Type Parameters

• **Value**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncOptionalReducerWithoutFinish`](../type-aliases/RawAsyncOptionalReducerWithoutFinish.md)\<`Value`, `This`\> \| [`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`, `This`\>

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

### Defined in

[reduce.d.ts:274](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L274)

## reduceConcur(asyncReducer, concurIterable)

> **reduceConcur**\<`Value`\>(`asyncReducer`, `concurIterable`): [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

### Type Parameters

• **Value**

### Parameters

• **asyncReducer**: [`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\> \| [`AsyncFunctionReducer`](../type-aliases/AsyncFunctionReducer.md)\<`Value`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

### Defined in

[reduce.d.ts:280](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L280)

## reduceConcur(asyncReducer)

> **reduceConcur**\<`Value`\>(`asyncReducer`): (`concurIterable`) => [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns the result of reducing the `concurIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `concurIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `concurIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty concur iterable is
returned if `concurIterable` is empty. Otherwise, an concur iterable
containing the result of reducing using the first value of the concur
iterable as the initial accumulator is returned.

Like `Array.prototype.reduce`, but for concur iterables.

### Type Parameters

• **Value**

### Parameters

• **asyncReducer**: [`AsyncFunctionReducer`](../type-aliases/AsyncFunctionReducer.md)\<`Value`\> \| [`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync((a, b) => `${a} ${b}`),
    getAsync,
  ),
)
//=> Hello World! What an interesting program!

console.log(
  await pipe(
    asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
    reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello World! What an interesting program!
```

### Defined in

[reduce.d.ts:284](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L284)
