[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / eachAsync

# Function: eachAsync()

Returns an async iterable equivalent to `asyncIterable` that applies `fn` to
each value of `asyncIterable` as it is iterated.

The result of applying `fn` to a value is awaited before yielding and then
moving on to the next value.

## Example

```js
const eachedSloths = await pipe(
  asAsync([`carl`, `frank`, `phil`]),
  eachAsync(console.log),
  reduceAsync(toArray()),
)
//=> carl
//=> frank
//=> phil

console.log(eachedSloths)
//=> [ 'carl', 'frank', 'phil' ]
```

## eachAsync(fn)

> **eachAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`Value`,
> `any`, `any`\>

Returns an async iterable equivalent to `asyncIterable` that applies `fn` to
each value of `asyncIterable` as it is iterated.

The result of applying `fn` to a value is awaited before yielding and then
moving on to the next value.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
const eachedSloths = await pipe(
  asAsync([`carl`, `frank`, `phil`]),
  eachAsync(console.log),
  reduceAsync(toArray()),
)
//=> carl
//=> frank
//=> phil

console.log(eachedSloths)
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

[iterate.d.ts:60](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/iterate.d.ts#L60)

## eachAsync(fn, asyncIterable)

> **eachAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`Value`,
> `any`, `any`\>

Returns an async iterable equivalent to `asyncIterable` that applies `fn` to
each value of `asyncIterable` as it is iterated.

The result of applying `fn` to a value is awaited before yielding and then
moving on to the next value.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
const eachedSloths = await pipe(
  asAsync([`carl`, `frank`, `phil`]),
  eachAsync(console.log),
  reduceAsync(toArray()),
)
//=> carl
//=> frank
//=> phil

console.log(eachedSloths)
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

[iterate.d.ts:63](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/iterate.d.ts#L63)

## eachAsync(fn)

> **eachAsync**\<`From`, `To`\>(`fn`): (`asyncIterable`) =>
> `AsyncIterable`\<`To`, `any`, `any`\>

Returns an async iterable equivalent to `asyncIterable` that applies `fn` to
each value of `asyncIterable` as it is iterated.

The result of applying `fn` to a value is awaited before yielding and then
moving on to the next value.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`From`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`To`, `any`, `any`\>

### Example

```js
const eachedSloths = await pipe(
  asAsync([`carl`, `frank`, `phil`]),
  eachAsync(console.log),
  reduceAsync(toArray()),
)
//=> carl
//=> frank
//=> phil

console.log(eachedSloths)
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

[iterate.d.ts:68](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/iterate.d.ts#L68)

## eachAsync(fn, asyncIterable)

> **eachAsync**\<`From`, `To`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`To`,
> `any`, `any`\>

Returns an async iterable equivalent to `asyncIterable` that applies `fn` to
each value of `asyncIterable` as it is iterated.

The result of applying `fn` to a value is awaited before yielding and then
moving on to the next value.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`From`, `any`, `any`\>

### Returns

`AsyncIterable`\<`To`, `any`, `any`\>

### Example

```js
const eachedSloths = await pipe(
  asAsync([`carl`, `frank`, `phil`]),
  eachAsync(console.log),
  reduceAsync(toArray()),
)
//=> carl
//=> frank
//=> phil

console.log(eachedSloths)
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

[iterate.d.ts:71](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/iterate.d.ts#L71)