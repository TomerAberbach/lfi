[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / chunkConcur

# Function: chunkConcur()

Returns a concur iterable equivalent to `concurIterable` except its values
are grouped into arrays that each contain `size` values.

The last array in the returned concur iterable will contain fewer than `size`
values (but at least one) if the number of values in `concurIterable` is not
divisible by `size`.

## Throws

if `size` is not a positive integer.

## Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    chunkConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

console.log(
  await pipe(
    asConcur([`S`, `L`, `O`, `T`, `H`]),
    chunkConcur(2),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
```

## chunkConcur(size)

> **chunkConcur**\<`Size`\>(`size`): \<`Value`\>(`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`[]\>

Returns a concur iterable equivalent to `concurIterable` except its values
are grouped into arrays that each contain `size` values.

The last array in the returned concur iterable will contain fewer than `size`
values (but at least one) if the number of values in `concurIterable` is not
divisible by `size`.

### Type Parameters

• **Size** *extends* `number`

### Parameters

• **size**: `PositiveInteger`\<`Size`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`[]\>

### Throws

if `size` is not a positive integer.

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    chunkConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

console.log(
  await pipe(
    asConcur([`S`, `L`, `O`, `T`, `H`]),
    chunkConcur(2),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
```

### Defined in

[slice.d.ts:896](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L896)

## chunkConcur(size, concurIterable)

> **chunkConcur**\<`Size`, `Value`\>(`size`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`[]\>

Returns a concur iterable equivalent to `concurIterable` except its values
are grouped into arrays that each contain `size` values.

The last array in the returned concur iterable will contain fewer than `size`
values (but at least one) if the number of values in `concurIterable` is not
divisible by `size`.

### Type Parameters

• **Size** *extends* `number`

• **Value**

### Parameters

• **size**: `PositiveInteger`\<`Size`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`[]\>

### Throws

if `size` is not a positive integer.

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    chunkConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

console.log(
  await pipe(
    asConcur([`S`, `L`, `O`, `T`, `H`]),
    chunkConcur(2),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
```

### Defined in

[slice.d.ts:899](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L899)
