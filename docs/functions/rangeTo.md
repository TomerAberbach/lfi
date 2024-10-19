[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / rangeTo

# Function: rangeTo()

Returns a [RangeIterable](../type-aliases/RangeIterable.md) that yields the integers between `start` and
`end` including `start` and `end`.

## Throws

if either `start` or `end` is not an integer.

## Example

```js
console.log([...rangeTo(0, 6)])
//=> [ 0, 1, 2, 3, 4, 5, 6 ]

console.log([...rangeTo(0, 6).step(2)])
//=> [ 0, 2, 4, 6 ]
```

## rangeTo(start)

> **rangeTo**\<`Start`\>(`start`): \<`End`\>(`end`) => [`RangeIterable`](../type-aliases/RangeIterable.md)

Returns a [RangeIterable](../type-aliases/RangeIterable.md) that yields the integers between `start` and
`end` including `start` and `end`.

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
console.log([...rangeTo(0, 6)])
//=> [ 0, 1, 2, 3, 4, 5, 6 ]

console.log([...rangeTo(0, 6).step(2)])
//=> [ 0, 2, 4, 6 ]
```

### Defined in

[generate.d.ts:152](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/generate.d.ts#L152)

## rangeTo(start, end)

> **rangeTo**\<`Start`, `End`\>(`start`, `end`): [`RangeIterable`](../type-aliases/RangeIterable.md)

Returns a [RangeIterable](../type-aliases/RangeIterable.md) that yields the integers between `start` and
`end` including `start` and `end`.

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
console.log([...rangeTo(0, 6)])
//=> [ 0, 1, 2, 3, 4, 5, 6 ]

console.log([...rangeTo(0, 6).step(2)])
//=> [ 0, 2, 4, 6 ]
```

### Defined in

[generate.d.ts:152](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/generate.d.ts#L152)
