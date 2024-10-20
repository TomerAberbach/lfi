[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / includesConcur

# Function: includesConcur()

Returns a promise that resolves to `true` if any value of `concurIterable` is
equal to `searchElement` using `Object.is`. Otherwise returns a promise that
resolves to `false`.

Like `Array.prototype.includes`, but for concur iterables.

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    includesConcur(3),
  ),
)
//=> true
```

## includesConcur(searchElement)

> **includesConcur**(`searchElement`): \<`Value`\>(`concurIterable`) => `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if any value of `concurIterable` is
equal to `searchElement` using `Object.is`. Otherwise returns a promise that
resolves to `false`.

Like `Array.prototype.includes`, but for concur iterables.

### Parameters

• **searchElement**: `unknown`

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

`Promise`\<`boolean`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    includesConcur(3),
  ),
)
//=> true
```

### Defined in

[predicate.d.ts:272](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/predicate.d.ts#L272)

## includesConcur(searchElement, concurIterable)

> **includesConcur**\<`Value`\>(`searchElement`, `concurIterable`): `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if any value of `concurIterable` is
equal to `searchElement` using `Object.is`. Otherwise returns a promise that
resolves to `false`.

Like `Array.prototype.includes`, but for concur iterables.

### Type Parameters

• **Value**

### Parameters

• **searchElement**: `unknown`

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

`Promise`\<`boolean`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    includesConcur(3),
  ),
)
//=> true
```

### Defined in

[predicate.d.ts:275](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/predicate.d.ts#L275)
