[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / reduce

# Function: reduce()

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

## Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

## reduce(reducer, iterable)

> **reduce**\<`Value`, `Acc`, `Finished`, `This`\>(`reducer`, `iterable`):
> `Finished`

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

### Type Parameters

• **Value**

• **Acc**

• **Finished**

• **This**

### Parameters

• **reducer**:
`Readonly`\<[`RawReducerWithFinish`](../type-aliases/RawReducerWithFinish.md)\<`Value`,
`Acc`, `Finished`, `This`\>\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Finished`

### Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

### Defined in

[reduce.d.ts:52](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reduce.d.ts#L52)

## reduce(reducer)

> **reduce**\<`Value`, `Acc`, `Finished`, `This`\>(`reducer`): (`iterable`) =>
> `Finished`

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

### Type Parameters

• **Value**

• **Acc**

• **Finished**

• **This**

### Parameters

• **reducer**:
`Readonly`\<[`RawReducerWithFinish`](../type-aliases/RawReducerWithFinish.md)\<`Value`,
`Acc`, `Finished`, `This`\>\>

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Finished`

### Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

### Defined in

[reduce.d.ts:56](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reduce.d.ts#L56)

## reduce(reducer, iterable)

> **reduce**\<`Value`, `Acc`, `This`\>(`reducer`, `iterable`): `Acc`

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

### Type Parameters

• **Value**

• **Acc**

• **This**

### Parameters

• **reducer**:
`Readonly`\<[`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`,
`Acc`, `This`\>\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Acc`

### Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

### Defined in

[reduce.d.ts:60](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reduce.d.ts#L60)

## reduce(reducer)

> **reduce**\<`Value`, `Acc`, `This`\>(`reducer`): (`iterable`) => `Acc`

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

### Type Parameters

• **Value**

• **Acc**

• **This**

### Parameters

• **reducer**:
`Readonly`\<[`RawReducerWithoutFinish`](../type-aliases/RawReducerWithoutFinish.md)\<`Value`,
`Acc`, `This`\>\>

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Acc`

### Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

### Defined in

[reduce.d.ts:64](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reduce.d.ts#L64)

## reduce(reducer, iterable)

> **reduce**\<`Value`, `Finished`, `This`\>(`reducer`, `iterable`):
> [`Optional`](../type-aliases/Optional.md)\<`Finished`\>

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

### Type Parameters

• **Value**

• **Finished**

• **This**

### Parameters

• **reducer**:
`Readonly`\<[`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`,
`Finished`, `This`\>\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

[`Optional`](../type-aliases/Optional.md)\<`Finished`\>

### Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

### Defined in

[reduce.d.ts:68](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reduce.d.ts#L68)

## reduce(reducer)

> **reduce**\<`Value`, `Finished`, `This`\>(`reducer`): (`iterable`) =>
> [`Optional`](../type-aliases/Optional.md)\<`Finished`\>

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

### Type Parameters

• **Value**

• **Finished**

• **This**

### Parameters

• **reducer**:
`Readonly`\<[`RawOptionalReducerWithFinish`](../type-aliases/RawOptionalReducerWithFinish.md)\<`Value`,
`Finished`, `This`\>\>

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

[`Optional`](../type-aliases/Optional.md)\<`Finished`\>

### Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

### Defined in

[reduce.d.ts:72](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reduce.d.ts#L72)

## reduce(reducer, iterable)

> **reduce**\<`Value`, `This`\>(`reducer`, `iterable`):
> [`Optional`](../type-aliases/Optional.md)\<`Value`\>

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

### Type Parameters

• **Value**

• **This**

### Parameters

• **reducer**:
`Readonly`\<[`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`,
`This`\>\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

[`Optional`](../type-aliases/Optional.md)\<`Value`\>

### Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

### Defined in

[reduce.d.ts:76](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reduce.d.ts#L76)

## reduce(reducer)

> **reduce**\<`Value`, `This`\>(`reducer`): (`iterable`) =>
> [`Optional`](../type-aliases/Optional.md)\<`Value`\>

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

### Type Parameters

• **Value**

• **This**

### Parameters

• **reducer**:
`Readonly`\<[`RawOptionalReducerWithoutFinish`](../type-aliases/RawOptionalReducerWithoutFinish.md)\<`Value`,
`This`\>\>

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

[`Optional`](../type-aliases/Optional.md)\<`Value`\>

### Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

### Defined in

[reduce.d.ts:80](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reduce.d.ts#L80)

## reduce(reducer, iterable)

> **reduce**\<`Value`\>(`reducer`, `iterable`):
> [`Optional`](../type-aliases/Optional.md)\<`Value`\>

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

### Type Parameters

• **Value**

### Parameters

• **reducer**:
[`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

[`Optional`](../type-aliases/Optional.md)\<`Value`\>

### Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

### Defined in

[reduce.d.ts:84](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reduce.d.ts#L84)

## reduce(reducer)

> **reduce**\<`Value`\>(`reducer`): (`iterable`) =>
> [`Optional`](../type-aliases/Optional.md)\<`Value`\>

Returns the result of reducing `iterable` using `reducer`.

An initial accumulator is created using Reducer.create. Then each value in
`iterable` is added to the accumulator and the current accumulator is updated
using Reducer.add. Finally, the resulting accumulator is transformed using
Reducer.finish if specified.

If `reducer` is an optional reducer (no Reducer.create method), then an empty
iterable is returned if `iterable` is empty. Otherwise, an iterable containing
the result of reducing using the first value of the iterable as the initial
accumulator is returned.

Like `Array.prototype.reduce`, but for iterables.

### Type Parameters

• **Value**

### Parameters

• **reducer**:
[`FunctionReducer`](../type-aliases/FunctionReducer.md)\<`Value`\>

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

[`Optional`](../type-aliases/Optional.md)\<`Value`\>

### Example

```js
console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce((a, b) => `${a} ${b}`),
    get,
  ),
)
//=> Hello Sloth! What an interesting program!

console.log(
  pipe(
    [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
    reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
  ),
)
//=> Hello Sloth! What an interesting program!
```

### Defined in

[reduce.d.ts:88](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reduce.d.ts#L88)
