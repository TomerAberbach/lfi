[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minMaxWithConcur

# Function: minMaxWithConcur()

Returns a concur iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `concurIterable` by comparing the numerical values of each value, as defined
by `fn`, if `concurIterable` contains at least one value. Otherwise, returns an
empty concur iterable.

## Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    minMaxWithConcur(value => value.length),
    getConcur,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

## minMaxWithConcur(fn, concurIterable)

> **minMaxWithConcur**\<`Value`\>(`fn`, `concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

Returns a concur iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `concurIterable` by comparing the numerical values of each value, as defined
by `fn`, if `concurIterable` contains at least one value. Otherwise, returns an
empty concur iterable.

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
    minMaxWithConcur(value => value.length),
    getConcur,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:898](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L898)

## minMaxWithConcur(fn)

> **minMaxWithConcur**\<`Value`\>(`fn`): (`concurIterable`) =>
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

Returns a concur iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `concurIterable` by comparing the numerical values of each value, as defined
by `fn`, if `concurIterable` contains at least one value. Otherwise, returns an
empty concur iterable.

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
    minMaxWithConcur(value => value.length),
    getConcur,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:902](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L902)