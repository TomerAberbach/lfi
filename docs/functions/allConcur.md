[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / allConcur

# Function: allConcur()

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for all values of `concurIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.every`, but for concur iterables.

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    allConcur(string => string.length > 8),
  ),
)
//=> false
```

## allConcur(fn)

> **allConcur**\<`Value`\>(`fn`): (`concurIterable`) => `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for all values of `concurIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.every`, but for concur iterables.

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
    allConcur(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:89](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/predicate.d.ts#L89)

## allConcur(fn, concurIterable)

> **allConcur**\<`Value`\>(`fn`, `concurIterable`): `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for all values of `concurIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.every`, but for concur iterables.

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
    allConcur(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:89](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/predicate.d.ts#L89)
