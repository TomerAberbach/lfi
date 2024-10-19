[**lfi**](../readme.md) • **Docs**

---

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

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

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

[predicate.d.ts:148](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/predicate.d.ts#L148)

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

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

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

[predicate.d.ts:148](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/predicate.d.ts#L148)
