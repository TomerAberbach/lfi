[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / eachConcur

# Function: eachConcur()

Returns an concur iterable equivalent to `concurIterable` that applies `fn` to
each value of `concurIterable` as it is iterated.

The result of applying `fn` to a value is awaited before yielding.

## Example

```js
const eachedSloths = await pipe(
  asConcur([`carl`, `frank`, `phil`]),
  eachConcur(console.log),
  reduceConcur(toArray()),
)
//=> carl
//=> frank
//=> phil

console.log(eachedSloths)
//=> [ 'carl', 'frank', 'phil' ]
```

## eachConcur(fn)

> **eachConcur**\<`Value`\>(`fn`): (`concurIterable`) =>
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns an concur iterable equivalent to `concurIterable` that applies `fn` to
each value of `concurIterable` as it is iterated.

The result of applying `fn` to a value is awaited before yielding.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
const eachedSloths = await pipe(
  asConcur([`carl`, `frank`, `phil`]),
  eachConcur(console.log),
  reduceConcur(toArray()),
)
//=> carl
//=> frank
//=> phil

console.log(eachedSloths)
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

[iterate.d.ts:99](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/iterate.d.ts#L99)

## eachConcur(fn, concurIterable)

> **eachConcur**\<`Value`\>(`fn`, `concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns an concur iterable equivalent to `concurIterable` that applies `fn` to
each value of `concurIterable` as it is iterated.

The result of applying `fn` to a value is awaited before yielding.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
const eachedSloths = await pipe(
  asConcur([`carl`, `frank`, `phil`]),
  eachConcur(console.log),
  reduceConcur(toArray()),
)
//=> carl
//=> frank
//=> phil

console.log(eachedSloths)
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

[iterate.d.ts:102](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/iterate.d.ts#L102)

## eachConcur(fn)

> **eachConcur**\<`From`, `To`\>(`fn`): (`concurIterable`) =>
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

Returns an concur iterable equivalent to `concurIterable` that applies `fn` to
each value of `concurIterable` as it is iterated.

The result of applying `fn` to a value is awaited before yielding.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

### Example

```js
const eachedSloths = await pipe(
  asConcur([`carl`, `frank`, `phil`]),
  eachConcur(console.log),
  reduceConcur(toArray()),
)
//=> carl
//=> frank
//=> phil

console.log(eachedSloths)
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

[iterate.d.ts:107](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/iterate.d.ts#L107)

## eachConcur(fn, concurIterable)

> **eachConcur**\<`From`, `To`\>(`fn`, `concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

Returns an concur iterable equivalent to `concurIterable` that applies `fn` to
each value of `concurIterable` as it is iterated.

The result of applying `fn` to a value is awaited before yielding.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

### Example

```js
const eachedSloths = await pipe(
  asConcur([`carl`, `frank`, `phil`]),
  eachConcur(console.log),
  reduceConcur(toArray()),
)
//=> carl
//=> frank
//=> phil

console.log(eachedSloths)
//=> [ 'carl', 'frank', 'phil' ]
```

### Defined in

[iterate.d.ts:110](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/iterate.d.ts#L110)
