[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / maxWithConcur

# Function: maxWithConcur()

Returns a concur iterable containing a maximum value of `concurIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`concurIterable` contains at least one value. Otherwise, returns an empty concur
iterable.

## Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    maxWithConcur(value => value.length),
    getConcur,
  ),
)
//=> sleeping
```

## maxWithConcur(fn, concurIterable)

> **maxWithConcur**\<`Value`\>(`fn`, `concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing a maximum value of `concurIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`concurIterable` contains at least one value. Otherwise, returns an empty concur
iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    maxWithConcur(value => value.length),
    getConcur,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:783](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L783)

## maxWithConcur(fn)

> **maxWithConcur**\<`Value`\>(`fn`): (`concurIterable`) =>
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing a maximum value of `concurIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`concurIterable` contains at least one value. Otherwise, returns an empty concur
iterable.

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

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    maxWithConcur(value => value.length),
    getConcur,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:783](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L783)