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

[predicate.d.ts:148](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/predicate.d.ts#L148)

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

[predicate.d.ts:148](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/predicate.d.ts#L148)
