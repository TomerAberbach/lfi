[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / filterMapConcur

# Function: filterMapConcur()

Returns a concur iterable containing the values of `concurIterable`
transformed by `fn` excluding the values for which `fn` returns a value
awaitable to `null` or `undefined`.

## Example

```js
console.log(
  await pipe(
    asConcur([
      { sloth: `sloth party` },
      { notSloth: `building` },
      { sloth: `sloths in trees` },
      { notSloth: `city` },
    ]),
    filterMapConcur(object => object.sloth),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

## filterMapConcur(fn)

> **filterMapConcur**\<`From`, `To`\>(`fn`): (`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`NonNullable`\<`To`\>\>

Returns a concur iterable containing the values of `concurIterable`
transformed by `fn` excluding the values for which `fn` returns a value
awaitable to `null` or `undefined`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`NonNullable`\<`To`\>\>

### Example

```js
console.log(
  await pipe(
    asConcur([
      { sloth: `sloth party` },
      { notSloth: `building` },
      { sloth: `sloths in trees` },
      { notSloth: `city` },
    ]),
    filterMapConcur(object => object.sloth),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

[filters.d.ts:202](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L202)

## filterMapConcur(fn, concurIterable)

> **filterMapConcur**\<`From`, `To`\>(`fn`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`NonNullable`\<`To`\>\>

Returns a concur iterable containing the values of `concurIterable`
transformed by `fn` excluding the values for which `fn` returns a value
awaitable to `null` or `undefined`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`NonNullable`\<`To`\>\>

### Example

```js
console.log(
  await pipe(
    asConcur([
      { sloth: `sloth party` },
      { notSloth: `building` },
      { sloth: `sloths in trees` },
      { notSloth: `city` },
    ]),
    filterMapConcur(object => object.sloth),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

[filters.d.ts:205](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L205)
