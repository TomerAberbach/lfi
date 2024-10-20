[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / chunkAsync

# Function: chunkAsync()

Returns an async iterable equivalent to `asyncIterable` except its values are
grouped into arrays that each contain `size` values.

The last array in the returned async iterable will contain fewer than `size`
values (but at least one) if the number of values in `asyncIterable` is not
divisible by `size`.

## Throws

if `size` is not a positive integer.

## Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    chunkAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

console.log(
  await pipe(
    asAsync([`S`, `L`, `O`, `T`, `H`]),
    chunkAsync(2),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
```

## chunkAsync(size)

> **chunkAsync**\<`Size`\>(`size`): \<`Value`\>(`asyncIterable`) => `AsyncIterable`\<`Value`[], `any`, `any`\>

Returns an async iterable equivalent to `asyncIterable` except its values are
grouped into arrays that each contain `size` values.

The last array in the returned async iterable will contain fewer than `size`
values (but at least one) if the number of values in `asyncIterable` is not
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

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`Value`[], `any`, `any`\>

### Throws

if `size` is not a positive integer.

### Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    chunkAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

console.log(
  await pipe(
    asAsync([`S`, `L`, `O`, `T`, `H`]),
    chunkAsync(2),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
```

### Defined in

[slice.d.ts:855](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L855)

## chunkAsync(size, asyncIterable)

> **chunkAsync**\<`Size`, `Value`\>(`size`, `asyncIterable`): `AsyncIterable`\<`Value`[], `any`, `any`\>

Returns an async iterable equivalent to `asyncIterable` except its values are
grouped into arrays that each contain `size` values.

The last array in the returned async iterable will contain fewer than `size`
values (but at least one) if the number of values in `asyncIterable` is not
divisible by `size`.

### Type Parameters

• **Size** *extends* `number`

• **Value**

### Parameters

• **size**: `PositiveInteger`\<`Size`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<`Value`[], `any`, `any`\>

### Throws

if `size` is not a positive integer.

### Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    chunkAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

console.log(
  await pipe(
    asAsync([`S`, `L`, `O`, `T`, `H`]),
    chunkAsync(2),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
```

### Defined in

[slice.d.ts:858](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L858)
