[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / sliceAsync

# Function: sliceAsync()

Returns an async iterable containing the values of `asyncIterable` between
`start` and `end` (exclusive) of `asyncIterable`.

If any part of the range between `start` and `end` is outside the bounds of
the async iterable, then that part is excluded from the returned async
iterable. Thus, the returned async iterable may be empty.

WARNING: This function linearly iterates up to `end` because async iterables
do not support random access.

## Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

## Example

```js
const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(0, 3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(0, 42),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(1, 3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(3, 5),
    reduceAsync(toArray()),
  ),
)
//=> []
```

## sliceAsync(start)

> **sliceAsync**\<`Start`\>(`start`): \<`End`\>(`End`) => \<`Value`\>(`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>\<`End`, `Value`\>(`End`, `asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` between
`start` and `end` (exclusive) of `asyncIterable`.

If any part of the range between `start` and `end` is outside the bounds of
the async iterable, then that part is excluded from the returned async
iterable. Thus, the returned async iterable may be empty.

WARNING: This function linearly iterates up to `end` because async iterables
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

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

##### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

#### Type Parameters

• **End** *extends* `number`

• **Value**

#### Parameters

• **End**: `NonNegativeInteger`\<`End`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

### Example

```js
const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(0, 3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(0, 42),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(1, 3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(3, 5),
    reduceAsync(toArray()),
  ),
)
//=> []
```

### Defined in

[splices.d.ts:578](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L578)

## sliceAsync(start, End)

> **sliceAsync**\<`Start`, `End`\>(`start`, `End`): \<`Value`\>(`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` between
`start` and `end` (exclusive) of `asyncIterable`.

If any part of the range between `start` and `end` is outside the bounds of
the async iterable, then that part is excluded from the returned async
iterable. Thus, the returned async iterable may be empty.

WARNING: This function linearly iterates up to `end` because async iterables
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

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

### Example

```js
const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(0, 3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(0, 42),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(1, 3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(3, 5),
    reduceAsync(toArray()),
  ),
)
//=> []
```

### Defined in

[splices.d.ts:590](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L590)

## sliceAsync(start, End, asyncIterable)

> **sliceAsync**\<`Start`, `End`, `Value`\>(`start`, `End`, `asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` between
`start` and `end` (exclusive) of `asyncIterable`.

If any part of the range between `start` and `end` is outside the bounds of
the async iterable, then that part is excluded from the returned async
iterable. Thus, the returned async iterable may be empty.

WARNING: This function linearly iterates up to `end` because async iterables
do not support random access.

### Type Parameters

• **Start** *extends* `number`

• **End** *extends* `number`

• **Value**

### Parameters

• **start**: `NonNegativeInteger`\<`Start`\>

• **End**: `NonNegativeInteger`\<`End`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

### Example

```js
const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(0, 3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(0, 42),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(1, 3),
    reduceAsync(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  await pipe(
    asyncIterable,
    sliceAsync(3, 5),
    reduceAsync(toArray()),
  ),
)
//=> []
```

### Defined in

[splices.d.ts:595](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L595)
