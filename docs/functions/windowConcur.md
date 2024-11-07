[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / windowConcur

# Function: windowConcur()

Returns a concur iterable containing a rolling window of the values of
`concurIterable` as arrays of length `size`.

## Throws

if `size` is not a positive integer.

## Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
    windowConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
    windowConcur({ size: 3, partialStart: true }),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
    windowConcur({ size: 3, partialStart: true, partialEnd: true }),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
```

## windowConcur(options)

> **windowConcur**\<`Size`\>(`options`): \<`Value`\>(`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`[]\>

Returns a concur iterable containing a rolling window of the values of
`concurIterable` as arrays of length `size`.

### Type Parameters

• **Size** *extends* `number`

### Parameters

• **options**: [`WindowOptions`](../type-aliases/WindowOptions.md)\<`Size`\>

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
    asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
    windowConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
    windowConcur({ size: 3, partialStart: true }),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
    windowConcur({ size: 3, partialStart: true, partialEnd: true }),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
```

### Defined in

splices.d.ts:1034

## windowConcur(options, concurIterable)

> **windowConcur**\<`Size`, `Value`\>(`options`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`[]\>

Returns a concur iterable containing a rolling window of the values of
`concurIterable` as arrays of length `size`.

### Type Parameters

• **Size** *extends* `number`

• **Value**

### Parameters

• **options**: [`WindowOptions`](../type-aliases/WindowOptions.md)\<`Size`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`[]\>

### Throws

if `size` is not a positive integer.

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
    windowConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
    windowConcur({ size: 3, partialStart: true }),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]

console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
    windowConcur({ size: 3, partialStart: true, partialEnd: true }),
    reduceConcur(toArray()),
  ),
)
//=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
```

### Defined in

splices.d.ts:1037
