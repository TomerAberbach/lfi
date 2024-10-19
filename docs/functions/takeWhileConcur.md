[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / takeWhileConcur

# Function: takeWhileConcur()

Returns a concur iterable containing the values of `concurIterable` in
iteration order up until but not including the first value for which `fn`
returns a value awaitable to a falsy value.

## Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
    takeWhileConcur(value => value < 5),
    reduceConcur(toArray()),
  ),
)
//=> [ 1, 2, 3, 4 ]
```

## takeWhileConcur(fn)

> **takeWhileConcur**\<`Value`\>(`fn`): (`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` in
iteration order up until but not including the first value for which `fn`
returns a value awaitable to a falsy value.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
    takeWhileConcur(value => value < 5),
    reduceConcur(toArray()),
  ),
)
//=> [ 1, 2, 3, 4 ]
```

### Defined in

[slice.d.ts:119](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/slice.d.ts#L119)

## takeWhileConcur(fn, concurIterable)

> **takeWhileConcur**\<`Value`\>(`fn`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` in
iteration order up until but not including the first value for which `fn`
returns a value awaitable to a falsy value.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
    takeWhileConcur(value => value < 5),
    reduceConcur(toArray()),
  ),
)
//=> [ 1, 2, 3, 4 ]
```

### Defined in

[slice.d.ts:119](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/slice.d.ts#L119)
