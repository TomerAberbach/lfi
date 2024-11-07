[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / windowAsync

# Function: windowAsync()

Returns an async iterable containing a rolling window of the values of
`asyncIterable` as arrays of length `size`.

## Throws

if `size` is not a positive integer.

## Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
    windowAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
    windowAsync({ size: 3, partialStart: true }),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
    windowAsync({ size: 3, partialStart: true, partialEnd: true }),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
```

## windowAsync(options)

> **windowAsync**\<`Size`\>(`options`): \<`Value`\>(`asyncIterable`) => `AsyncIterable`\<`Value`[], `any`, `any`\>

Returns an async iterable containing a rolling window of the values of
`asyncIterable` as arrays of length `size`.

### Type Parameters

• **Size** *extends* `number`

### Parameters

• **options**: [`WindowOptions`](../type-aliases/WindowOptions.md)\<`Size`\>

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
    asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
    windowAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
    windowAsync({ size: 3, partialStart: true }),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
    windowAsync({ size: 3, partialStart: true, partialEnd: true }),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
```

### Defined in

splices.d.ts:988

## windowAsync(options, asyncIterable)

> **windowAsync**\<`Size`, `Value`\>(`options`, `asyncIterable`): `AsyncIterable`\<`Value`[], `any`, `any`\>

Returns an async iterable containing a rolling window of the values of
`asyncIterable` as arrays of length `size`.

### Type Parameters

• **Size** *extends* `number`

• **Value**

### Parameters

• **options**: [`WindowOptions`](../type-aliases/WindowOptions.md)\<`Size`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<`Value`[], `any`, `any`\>

### Throws

if `size` is not a positive integer.

### Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
    windowAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
    windowAsync({ size: 3, partialStart: true }),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
    windowAsync({ size: 3, partialStart: true, partialEnd: true }),
    reduceAsync(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
```

### Defined in

splices.d.ts:991
