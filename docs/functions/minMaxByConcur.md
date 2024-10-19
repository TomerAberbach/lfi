[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minMaxByConcur

# Function: minMaxByConcur()

Returns a concur iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `concurIterable` based on the `fn`
[AsyncCompare](../type-aliases/AsyncCompare.md) function if `concurIterable`
contains at least one value. Otherwise, returns an empty concur iterable.

## Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    minMaxByConcur((a, b) => a.length - b.length),
    getConcur,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

## minMaxByConcur(fn, concurIterable)

> **minMaxByConcur**\<`Value`\>(`fn`, `concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

Returns a concur iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `concurIterable` based on the `fn`
[AsyncCompare](../type-aliases/AsyncCompare.md) function if `concurIterable`
contains at least one value. Otherwise, returns an empty concur iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

### Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    minMaxByConcur((a, b) => a.length - b.length),
    getConcur,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:553](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L553)

## minMaxByConcur(fn)

> **minMaxByConcur**\<`Value`\>(`fn`): (`concurIterable`) =>
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

Returns a concur iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `concurIterable` based on the `fn`
[AsyncCompare](../type-aliases/AsyncCompare.md) function if `concurIterable`
contains at least one value. Otherwise, returns an empty concur iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

### Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    minMaxByConcur((a, b) => a.length - b.length),
    getConcur,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:557](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L557)
