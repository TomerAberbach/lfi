[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / maxByConcur

# Function: maxByConcur()

Returns a concur iterable containing a maximum value of `concurIterable` based
on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if
`concurIterable` contains at least one value. Otherwise, returns an empty concur
iterable.

## Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    maxByConcur((a, b) => a.length - b.length),
    getConcur,
  ),
)
//=> sleeping
```

## maxByConcur(fn, concurIterable)

> **maxByConcur**\<`Value`\>(`fn`, `concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing a maximum value of `concurIterable` based
on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if
`concurIterable` contains at least one value. Otherwise, returns an empty concur
iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    maxByConcur((a, b) => a.length - b.length),
    getConcur,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:366](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L366)

## maxByConcur(fn)

> **maxByConcur**\<`Value`\>(`fn`): (`concurIterable`) =>
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing a maximum value of `concurIterable` based
on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if
`concurIterable` contains at least one value. Otherwise, returns an empty concur
iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

### Returns

`Function`

#### Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    maxByConcur((a, b) => a.length - b.length),
    getConcur,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:366](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L366)
