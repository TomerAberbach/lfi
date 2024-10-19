[**lfi**](../readme.md) • **Docs**

---

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

> **chunkAsync**\<`Size`\>(`size`): \<`Value`\>(`asyncIterable`) =>
> `AsyncIterable`\<`Value`[], `any`, `any`\>

Returns an async iterable equivalent to `asyncIterable` except its values are
grouped into arrays that each contain `size` values.

The last array in the returned async iterable will contain fewer than `size`
values (but at least one) if the number of values in `asyncIterable` is not
divisible by `size`.

### Type Parameters

• **Size** _extends_ `number`

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

[slice.d.ts:514](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/slice.d.ts#L514)

## chunkAsync(size, asyncIterable)

> **chunkAsync**\<`Size`, `Value`\>(`size`, `asyncIterable`):
> `AsyncIterable`\<`Value`[], `any`, `any`\>

Returns an async iterable equivalent to `asyncIterable` except its values are
grouped into arrays that each contain `size` values.

The last array in the returned async iterable will contain fewer than `size`
values (but at least one) if the number of values in `asyncIterable` is not
divisible by `size`.

### Type Parameters

• **Size** _extends_ `number`

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

[slice.d.ts:517](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/slice.d.ts#L517)
