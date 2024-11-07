[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / minWithConcur

# Function: minWithConcur()

Returns a concur iterable containing a minimum value of `concurIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`concurIterable` contains at least one value. Otherwise, returns an empty
concur iterable.

## Example

```js
console.log(
  await pipe(
    asConcur([`eating`, `sleeping`, `yawning`]),
    minWithConcur(value => value.length),
    getConcur,
  ),
)
//=> eating
```

## minWithConcur(fn, concurIterable)

> **minWithConcur**\<`Value`\>(`fn`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing a minimum value of `concurIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`concurIterable` contains at least one value. Otherwise, returns an empty
concur iterable.

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
    asConcur([`eating`, `sleeping`, `yawning`]),
    minWithConcur(value => value.length),
    getConcur,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:693](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L693)

## minWithConcur(fn)

> **minWithConcur**\<`Value`\>(`fn`): (`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing a minimum value of `concurIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`concurIterable` contains at least one value. Otherwise, returns an empty
concur iterable.

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
    asConcur([`eating`, `sleeping`, `yawning`]),
    minWithConcur(value => value.length),
    getConcur,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:693](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L693)
