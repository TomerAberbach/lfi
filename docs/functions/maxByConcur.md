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

[statistics.d.ts:440](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L440)

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

[statistics.d.ts:440](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L440)
