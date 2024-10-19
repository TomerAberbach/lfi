[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / filterMapConcur

# Function: filterMapConcur()

Returns a concur iterable containing the values of `concurIterable` transformed
by `fn` excluding the values for which `fn` returns a value awaitable to `null`
or `undefined`.

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

> **filterMapConcur**\<`From`, `To`\>(`fn`): (`concurIterable`) =>
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`NonNullable`\<`To`\>\>

Returns a concur iterable containing the values of `concurIterable` transformed
by `fn` excluding the values for which `fn` returns a value awaitable to `null`
or `undefined`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

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

[exclude.d.ts:201](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/exclude.d.ts#L201)

## filterMapConcur(fn, concurIterable)

> **filterMapConcur**\<`From`, `To`\>(`fn`, `concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`NonNullable`\<`To`\>\>

Returns a concur iterable containing the values of `concurIterable` transformed
by `fn` excluding the values for which `fn` returns a value awaitable to `null`
or `undefined`.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

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

[exclude.d.ts:204](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/exclude.d.ts#L204)