[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / sliceConcur

# Function: sliceConcur()

Returns a concur iterable containing the values of `concurIterable` between
`start` and `end` (exclusive) of `concurIterable` in iteration order.

If any part of the range between `start` and `end` is outside the bounds of
the concur iterable, then that part is excluded from the returned concur
iterable. Thus, the returned concur iterable may be empty.

WARNING: This function linearly iterates up to `end` because concur iterables
do not support random access.

## Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

## Example

```js
const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    concurIterable,
    sliceConcur(0, 3),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(0, 42),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(1, 3),
    reduceConcur(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(3, 5),
    reduceConcur(toArray()),
  ),
)
//=> []
```

## sliceConcur(start)

> **sliceConcur**\<`Start`\>(`start`): \<`End`\>(`End`) => \<`Value`\>(`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>\<`End`, `Value`\>(`End`, `concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` between
`start` and `end` (exclusive) of `concurIterable` in iteration order.

If any part of the range between `start` and `end` is outside the bounds of
the concur iterable, then that part is excluded from the returned concur
iterable. Thus, the returned concur iterable may be empty.

WARNING: This function linearly iterates up to `end` because concur iterables
do not support random access.

### Type Parameters

• **Start** *extends* `number`

### Parameters

• **start**: `NonNegativeInteger`\<`Start`\>

### Returns

`Function`

#### Type Parameters

• **End** *extends* `number`

#### Parameters

• **End**: `NonNegativeInteger`\<`End`\>

#### Returns

`Function`

##### Type Parameters

• **Value**

##### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

##### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Type Parameters

• **End** *extends* `number`

• **Value**

#### Parameters

• **End**: `NonNegativeInteger`\<`End`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

### Example

```js
const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    concurIterable,
    sliceConcur(0, 3),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(0, 42),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(1, 3),
    reduceConcur(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(3, 5),
    reduceConcur(toArray()),
  ),
)
//=> []
```

### Defined in

[splices.d.ts:658](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L658)

## sliceConcur(start, End)

> **sliceConcur**\<`Start`, `End`\>(`start`, `End`): \<`Value`\>(`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` between
`start` and `end` (exclusive) of `concurIterable` in iteration order.

If any part of the range between `start` and `end` is outside the bounds of
the concur iterable, then that part is excluded from the returned concur
iterable. Thus, the returned concur iterable may be empty.

WARNING: This function linearly iterates up to `end` because concur iterables
do not support random access.

### Type Parameters

• **Start** *extends* `number`

• **End** *extends* `number`

### Parameters

• **start**: `NonNegativeInteger`\<`Start`\>

• **End**: `NonNegativeInteger`\<`End`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

### Example

```js
const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    concurIterable,
    sliceConcur(0, 3),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(0, 42),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(1, 3),
    reduceConcur(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(3, 5),
    reduceConcur(toArray()),
  ),
)
//=> []
```

### Defined in

[splices.d.ts:670](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L670)

## sliceConcur(start, End, concurIterable)

> **sliceConcur**\<`Start`, `End`, `Value`\>(`start`, `End`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` between
`start` and `end` (exclusive) of `concurIterable` in iteration order.

If any part of the range between `start` and `end` is outside the bounds of
the concur iterable, then that part is excluded from the returned concur
iterable. Thus, the returned concur iterable may be empty.

WARNING: This function linearly iterates up to `end` because concur iterables
do not support random access.

### Type Parameters

• **Start** *extends* `number`

• **End** *extends* `number`

• **Value**

### Parameters

• **start**: `NonNegativeInteger`\<`Start`\>

• **End**: `NonNegativeInteger`\<`End`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

### Example

```js
const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    concurIterable,
    sliceConcur(0, 3),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(0, 42),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(1, 3),
    reduceConcur(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    concurIterable,
    sliceConcur(3, 5),
    reduceConcur(toArray()),
  ),
)
//=> []
```

### Defined in

[splices.d.ts:675](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L675)
