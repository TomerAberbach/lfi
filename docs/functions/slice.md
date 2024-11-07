[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / slice

# Function: slice()

Returns an iterable containing the values of `iterable` between `start` and
`end` (exclusive) of `iterable`.

If any part of the range between `start` and `end` is outside the bounds of
the iterable, then that part is excluded from the returned iterable. Thus,
the returned iterable may be empty.

WARNING: This function linearly iterates up to `end` because iterables do
not support random access.

## Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

## Example

```js
const iterable = [`sloth`, `more sloth`, `even more sloth`]

console.log(
  pipe(
    iterable,
    slice(0, 3),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(0, 42),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(1, 3),
    reduce(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(3, 5),
    reduce(toArray()),
  ),
)
//=> []
```

## slice(start)

> **slice**\<`Start`\>(`start`): \<`End`\>(`End`) => \<`Value`\>(`iterable`) => `Iterable`\<`Value`, `any`, `any`\>\<`End`, `Value`\>(`End`, `iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` between `start` and
`end` (exclusive) of `iterable`.

If any part of the range between `start` and `end` is outside the bounds of
the iterable, then that part is excluded from the returned iterable. Thus,
the returned iterable may be empty.

WARNING: This function linearly iterates up to `end` because iterables do
not support random access.

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

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

##### Returns

`Iterable`\<`Value`, `any`, `any`\>

#### Type Parameters

• **End** *extends* `number`

• **Value**

#### Parameters

• **End**: `NonNegativeInteger`\<`End`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

### Example

```js
const iterable = [`sloth`, `more sloth`, `even more sloth`]

console.log(
  pipe(
    iterable,
    slice(0, 3),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(0, 42),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(1, 3),
    reduce(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(3, 5),
    reduce(toArray()),
  ),
)
//=> []
```

### Defined in

splices.d.ts:498

## slice(start, End)

> **slice**\<`Start`, `End`\>(`start`, `End`): \<`Value`\>(`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` between `start` and
`end` (exclusive) of `iterable`.

If any part of the range between `start` and `end` is outside the bounds of
the iterable, then that part is excluded from the returned iterable. Thus,
the returned iterable may be empty.

WARNING: This function linearly iterates up to `end` because iterables do
not support random access.

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

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

### Example

```js
const iterable = [`sloth`, `more sloth`, `even more sloth`]

console.log(
  pipe(
    iterable,
    slice(0, 3),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(0, 42),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(1, 3),
    reduce(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(3, 5),
    reduce(toArray()),
  ),
)
//=> []
```

### Defined in

splices.d.ts:510

## slice(start, End, iterable)

> **slice**\<`Start`, `End`, `Value`\>(`start`, `End`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` between `start` and
`end` (exclusive) of `iterable`.

If any part of the range between `start` and `end` is outside the bounds of
the iterable, then that part is excluded from the returned iterable. Thus,
the returned iterable may be empty.

WARNING: This function linearly iterates up to `end` because iterables do
not support random access.

### Type Parameters

• **Start** *extends* `number`

• **End** *extends* `number`

• **Value**

### Parameters

• **start**: `NonNegativeInteger`\<`Start`\>

• **End**: `NonNegativeInteger`\<`End`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Throws

if either `start` or `end` is not a non-negative integer, or if
`start` is greater than `end`.

### Example

```js
const iterable = [`sloth`, `more sloth`, `even more sloth`]

console.log(
  pipe(
    iterable,
    slice(0, 3),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(0, 42),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(1, 3),
    reduce(toArray()),
  ),
)
//=> [ 'more sloth', 'even more sloth' ]

console.log(
  pipe(
    iterable,
    slice(3, 5),
    reduce(toArray()),
  ),
)
//=> []
```

### Defined in

splices.d.ts:515
