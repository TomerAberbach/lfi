[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / window

# Function: window()

Returns an iterable containing a rolling window of the values of `iterable` as
arrays of length `size`.

## Throws

if `size` is not a positive integer.

## Example

```js
console.log(pipe([1, 2, 3, 4, 5, 6, `sloth`], window(3), reduce(toArray())))
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

> **window**\<`Size`\>(`options`): \<`Value`\>(`iterable`) =>
> `Iterable`\<`Value`[], `any`, `any`\>

Returns an iterable containing a rolling window of the values of `iterable` as
arrays of length `size`.

### Type Parameters

• **Size** _extends_ `number`

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
console.log(pipe([1, 2, 3, 4, 5, 6, `sloth`], window(3), reduce(toArray())))
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

[slice.d.ts:601](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/slice.d.ts#L601)

## window(options, iterable)

> **window**\<`Size`, `Value`\>(`options`, `iterable`): `Iterable`\<`Value`[],
> `any`, `any`\>

Returns an iterable containing a rolling window of the values of `iterable` as
arrays of length `size`.

### Type Parameters

• **Size** _extends_ `number`

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
console.log(pipe([1, 2, 3, 4, 5, 6, `sloth`], window(3), reduce(toArray())))
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

[slice.d.ts:604](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/slice.d.ts#L604)
