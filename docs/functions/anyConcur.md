[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / anyConcur

# Function: anyConcur()

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for any value of `concurIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.some`, but for concur iterables.

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    anyConcur(string => string.length > 8),
  ),
)
//=> true
```

## anyConcur(fn)

> **anyConcur**\<`Value`\>(`fn`): (`concurIterable`) => `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for any value of `concurIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.some`, but for concur iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

`Promise`\<`boolean`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    anyConcur(string => string.length > 8),
  ),
)
//=> true
```

### Defined in

[predicates.d.ts:148](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/predicates.d.ts#L148)

## anyConcur(fn, concurIterable)

> **anyConcur**\<`Value`\>(`fn`, `concurIterable`): `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for any value of `concurIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.some`, but for concur iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

`Promise`\<`boolean`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    anyConcur(string => string.length > 8),
  ),
)
//=> true
```

### Defined in

[predicates.d.ts:148](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/predicates.d.ts#L148)
