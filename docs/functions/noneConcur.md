[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / noneConcur

# Function: noneConcur()

Returns a promise that resolves to `true` if `fn` returns a falsy value or a
promise that resolves to a falsy value for all values of `concurIterable`.
Otherwise returns a promise that resolves to `false`.

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    noneConcur(string => string.length > 8),
  ),
)
//=> false
```

## noneConcur(fn)

> **noneConcur**\<`Value`\>(`fn`): (`concurIterable`) => `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a falsy value or a
promise that resolves to a falsy value for all values of `concurIterable`.
Otherwise returns a promise that resolves to `false`.

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
    noneConcur(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:201](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/predicate.d.ts#L201)

## noneConcur(fn, concurIterable)

> **noneConcur**\<`Value`\>(`fn`, `concurIterable`): `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a falsy value or a
promise that resolves to a falsy value for all values of `concurIterable`.
Otherwise returns a promise that resolves to `false`.

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
    noneConcur(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:201](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/predicate.d.ts#L201)
