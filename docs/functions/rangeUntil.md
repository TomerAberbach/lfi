[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / rangeUntil

# Function: rangeUntil()

Returns a [RangeIterable](../type-aliases/RangeIterable.md) that yields the integers between `start` and
`end` including `start`, but excluding `end`.

## Throws

if either `start` or `end` is not an integer.

## Example

```js
console.log([...rangeUntil(0, 6)])
//=> [ 0, 1, 2, 3, 4, 5 ]

console.log([...rangeUntil(0, 6).step(2)])
//=> [ 0, 2, 4 ]
```

## rangeUntil(start)

> **rangeUntil**\<`Start`\>(`start`): \<`End`\>(`end`) => [`RangeIterable`](../type-aliases/RangeIterable.md)

Returns a [RangeIterable](../type-aliases/RangeIterable.md) that yields the integers between `start` and
`end` including `start`, but excluding `end`.

### Type Parameters

• **Start** *extends* `number`

### Parameters

• **start**: `Integer`\<`Start`\>

### Returns

`Function`

#### Type Parameters

• **End** *extends* `number`

#### Parameters

• **end**: `Integer`\<`End`\>

#### Returns

[`RangeIterable`](../type-aliases/RangeIterable.md)

### Throws

if either `start` or `end` is not an integer.

### Example

```js
console.log([...rangeUntil(0, 6)])
//=> [ 0, 1, 2, 3, 4, 5 ]

console.log([...rangeUntil(0, 6).step(2)])
//=> [ 0, 2, 4 ]
```

### Defined in

[generate.d.ts:169](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/generate.d.ts#L169)

## rangeUntil(start, end)

> **rangeUntil**\<`Start`, `End`\>(`start`, `end`): [`RangeIterable`](../type-aliases/RangeIterable.md)

Returns a [RangeIterable](../type-aliases/RangeIterable.md) that yields the integers between `start` and
`end` including `start`, but excluding `end`.

### Type Parameters

• **Start** *extends* `number`

• **End** *extends* `number`

### Parameters

• **start**: `Integer`\<`Start`\>

• **end**: `Integer`\<`End`\>

### Returns

[`RangeIterable`](../type-aliases/RangeIterable.md)

### Throws

if either `start` or `end` is not an integer.

### Example

```js
console.log([...rangeUntil(0, 6)])
//=> [ 0, 1, 2, 3, 4, 5 ]

console.log([...rangeUntil(0, 6).step(2)])
//=> [ 0, 2, 4 ]
```

### Defined in

[generate.d.ts:169](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/generate.d.ts#L169)
