[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / window

# Function: window()

Returns an iterable containing a rolling window of the values of `iterable`
as arrays of length `size`.

## Throws

if `size` is not a positive integer.

## Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, `sloth`],
    window(3),
    reduce(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, `sloth`],
    window({ size: 3, partialStart: true }),
    reduce(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, `sloth`],
    window({ size: 3, partialStart: true, partialEnd: true }),
    reduce(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
```

## window(options)

> **window**\<`Size`\>(`options`): \<`Value`\>(`iterable`) => `Iterable`\<`Value`[], `any`, `any`\>

Returns an iterable containing a rolling window of the values of `iterable`
as arrays of length `size`.

### Type Parameters

• **Size** *extends* `number`

### Parameters

• **options**: [`WindowOptions`](../type-aliases/WindowOptions.md)\<`Size`\>

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
    [1, 2, 3, 4, 5, 6, `sloth`],
    window(3),
    reduce(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, `sloth`],
    window({ size: 3, partialStart: true }),
    reduce(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, `sloth`],
    window({ size: 3, partialStart: true, partialEnd: true }),
    reduce(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
```

### Defined in

[slice.d.ts:942](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L942)

## window(options, iterable)

> **window**\<`Size`, `Value`\>(`options`, `iterable`): `Iterable`\<`Value`[], `any`, `any`\>

Returns an iterable containing a rolling window of the values of `iterable`
as arrays of length `size`.

### Type Parameters

• **Size** *extends* `number`

• **Value**

### Parameters

• **options**: [`WindowOptions`](../type-aliases/WindowOptions.md)\<`Size`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`[], `any`, `any`\>

### Throws

if `size` is not a positive integer.

### Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, `sloth`],
    window(3),
    reduce(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, `sloth`],
    window({ size: 3, partialStart: true }),
    reduce(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  pipe(
    [1, 2, 3, 4, 5, 6, `sloth`],
    window({ size: 3, partialStart: true, partialEnd: true }),
    reduce(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
```

### Defined in

[slice.d.ts:945](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L945)
