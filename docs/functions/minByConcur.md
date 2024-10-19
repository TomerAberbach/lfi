[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / minByConcur

# Function: minByConcur()

Returns a concur iterable containing a minimum value of `concurIterable`
based on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if `concurIterable` contains
at least one value. Otherwise, returns an empty concur iterable.

## Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    minByConcur((a, b) => a.length - b.length),
    getConcur,
  ),
)
//=> eating
```

## minByConcur(fn, concurIterable)

> **minByConcur**\<`Value`\>(`fn`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing a minimum value of `concurIterable`
based on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if `concurIterable` contains
at least one value. Otherwise, returns an empty concur iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    minByConcur((a, b) => a.length - b.length),
    getConcur,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:353](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L353)

## minByConcur(fn)

> **minByConcur**\<`Value`\>(`fn`): (`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing a minimum value of `concurIterable`
based on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if `concurIterable` contains
at least one value. Otherwise, returns an empty concur iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

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
    asConcur([`eating`, `sleeping`, `yawning`]),
    minByConcur((a, b) => a.length - b.length),
    getConcur,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:353](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L353)
