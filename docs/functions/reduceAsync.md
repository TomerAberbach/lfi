[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / reduceAsync

# Function: reduceAsync()

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

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

## reduceAsync(asyncReducer, asyncIterable)

> **reduceAsync**\<`Value`, `Acc`, `Finished`, `This`\>(`asyncReducer`, `asyncIterable`): `Promise`\<`Finished`\>

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

### Type Parameters

• **Value**

• **Acc**

• **Finished**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncReducerWithFinish`](../type-aliases/RawAsyncReducerWithFinish.md)\<`Value`, `Acc`, `Finished`, `This`\> \| [`RawReducerWithFinish`](../type-aliases/RawReducerWithFinish.md)\<`Value`, `Acc`, `Finished`, `This`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

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

[reduce.d.ts:134](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L134)

## reduceAsync(asyncReducer)

> **reduceAsync**\<`Value`, `Acc`, `Finished`, `This`\>(`asyncReducer`): (`asyncIterable`) => `Promise`\<`Finished`\>

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

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

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

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

[reduce.d.ts:140](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L140)

## reduceAsync(asyncReducer, asyncIterable)

> **reduceAsync**\<`Value`, `Acc`, `This`\>(`asyncReducer`, `asyncIterable`): `Promise`\<`Acc`\>

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

### Type Parameters

• **Value**

• **Acc**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncReducerWithoutFinish`](../type-aliases/RawAsyncReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\> \| [`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

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

[reduce.d.ts:146](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L146)

## reduceAsync(asyncReducer)

> **reduceAsync**\<`Value`, `Acc`, `This`\>(`asyncReducer`): (`asyncIterable`) => `Promise`\<`Acc`\>

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

### Type Parameters

• **Value**

• **Acc**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncReducerWithoutFinish`](../type-aliases/RawAsyncReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\> \| [`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\>

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

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

[reduce.d.ts:152](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L152)

## reduceAsync(asyncReducer, asyncIterable)

> **reduceAsync**\<`Value`, `Finished`, `This`\>(`asyncReducer`, `asyncIterable`): [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Finished`\>

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

### Type Parameters

• **Value**

• **Finished**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncOptionalReducerWithFinish`](../type-aliases/RawAsyncOptionalReducerWithFinish.md)\<`Value`, `Finished`, `This`\> \| [`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`, `Finished`, `This`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Finished`\>

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

[reduce.d.ts:158](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L158)

## reduceAsync(asyncReducer)

> **reduceAsync**\<`Value`, `Finished`, `This`\>(`asyncReducer`): (`asyncIterable`) => [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Finished`\>

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

### Type Parameters

• **Value**

• **Finished**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncOptionalReducerWithFinish`](../type-aliases/RawAsyncOptionalReducerWithFinish.md)\<`Value`, `Finished`, `This`\> \| [`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`, `Finished`, `This`\>

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Finished`\>

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

[reduce.d.ts:164](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L164)

## reduceAsync(asyncReducer, asyncIterable)

> **reduceAsync**\<`Value`, `This`\>(`asyncReducer`, `asyncIterable`): [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

### Type Parameters

• **Value**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncOptionalReducerWithoutFinish`](../type-aliases/RawAsyncOptionalReducerWithoutFinish.md)\<`Value`, `This`\> \| [`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`, `This`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

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

[reduce.d.ts:170](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L170)

## reduceAsync(asyncReducer)

> **reduceAsync**\<`Value`, `This`\>(`asyncReducer`): (`asyncIterable`) => [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

### Type Parameters

• **Value**

• **This**

### Parameters

• **asyncReducer**: [`RawAsyncOptionalReducerWithoutFinish`](../type-aliases/RawAsyncOptionalReducerWithoutFinish.md)\<`Value`, `This`\> \| [`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`, `This`\>

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

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

[reduce.d.ts:176](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L176)

## reduceAsync(asyncReducer, asyncIterable)

> **reduceAsync**\<`Value`\>(`asyncReducer`, `asyncIterable`): [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

### Type Parameters

• **Value**

### Parameters

• **asyncReducer**: [`AsyncFunctionReducer`](../type-aliases/AsyncFunctionReducer.md)\<`Value`\> \| [`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

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

[reduce.d.ts:182](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L182)

## reduceAsync(asyncReducer)

> **reduceAsync**\<`Value`\>(`asyncReducer`): (`asyncIterable`) => [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

Returns the result of reducing the `asyncIterable` using `asyncReducer`.

Informally, an initial accumulator is created using
AsyncReducer.create. Then each value in `asyncIterable` is added to
the accumulator and the current accumulator is updated using
AsyncReducer.add. Finally, the resulting accumulator is transformed
using AsyncReducer.finish if specified. Multiple accumulators may be
created, added to, and then combined if supported via
AsyncReducer.combine and the next value of `asyncIterable` is ready
before promises from AsyncReducer.add resolve.

If `asyncReducer` is an async optional reducer (no
AsyncReducer.create method), then an empty async iterable is returned
if `asyncIterable` is empty. Otherwise, an async iterable containing the
result of reducing using the first value of the async iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for async iterables.

### Type Parameters

• **Value**

### Parameters

• **asyncReducer**: [`AsyncFunctionReducer`](../type-aliases/AsyncFunctionReducer.md)\<`Value`\> \| [`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

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

[reduce.d.ts:186](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reduce.d.ts#L186)
