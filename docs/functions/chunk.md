[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / chunk

# Function: chunk()

Returns an iterable equivalent to `iterable` except its values are grouped
into arrays that each contain `size` values.

The last array in the returned iterable will contain fewer than `size` values
(but at least one) if the number of values in `iterable` is not divisible by
`size`.

## Throws

if `size` is not a positive integer.

## Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    chunk(3),
    reduce(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

console.log(
  pipe(
    [`S`, `L`, `O`, `T`, `H`],
    chunk(2),
    reduce(toArray()),
  ),
)
//=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
```

## chunk(size)

> **chunk**\<`Size`\>(`size`): \<`Value`\>(`iterable`) => `Iterable`\<`Value`[], `any`, `any`\>

Returns an iterable equivalent to `iterable` except its values are grouped
into arrays that each contain `size` values.

The last array in the returned iterable will contain fewer than `size` values
(but at least one) if the number of values in `iterable` is not divisible by
`size`.

### Type Parameters

• **Size** *extends* `number`

### Parameters

• **size**: `PositiveInteger`\<`Size`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Iterable`\<`Value`[], `any`, `any`\>

### Throws

if `size` is not a positive integer.

### Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    chunk(3),
    reduce(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

console.log(
  pipe(
    [`S`, `L`, `O`, `T`, `H`],
    chunk(2),
    reduce(toArray()),
  ),
)
//=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
```

### Defined in

[splices.d.ts:814](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L814)

## chunk(size, iterable)

> **chunk**\<`Size`, `Value`\>(`size`, `iterable`): `Iterable`\<`Value`[], `any`, `any`\>

Returns an iterable equivalent to `iterable` except its values are grouped
into arrays that each contain `size` values.

The last array in the returned iterable will contain fewer than `size` values
(but at least one) if the number of values in `iterable` is not divisible by
`size`.

### Type Parameters

• **Size** *extends* `number`

• **Value**

### Parameters

• **size**: `PositiveInteger`\<`Size`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`[], `any`, `any`\>

### Throws

if `size` is not a positive integer.

### Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    chunk(3),
    reduce(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

console.log(
  pipe(
    [`S`, `L`, `O`, `T`, `H`],
    chunk(2),
    reduce(toArray()),
  ),
)
//=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
```

### Defined in

[splices.d.ts:817](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L817)
