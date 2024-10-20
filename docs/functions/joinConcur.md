[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / joinConcur

# Function: joinConcur()

Returns a promise that resolves to the result of concatenating the values of
`concurIterable` to a string where values are separated by `separator`.

Like `Array.prototype.join`, but for concur iterables, but does not treat
`null`, `undefined`, or `[]` specially.

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    joinConcur(`, `),
  ),
)
//=> sloth, more sloth, even more sloth
```

## joinConcur(separator)

> **joinConcur**(`separator`): (`concurIterable`) => `Promise`\<`string`\>

Returns a promise that resolves to the result of concatenating the values of
`concurIterable` to a string where values are separated by `separator`.

Like `Array.prototype.join`, but for concur iterables, but does not treat
`null`, `undefined`, or `[]` specially.

### Parameters

• **separator**: `string`

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`unknown`\>

#### Returns

`Promise`\<`string`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    joinConcur(`, `),
  ),
)
//=> sloth, more sloth, even more sloth
```

### Defined in

[collect.d.ts:426](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/collect.d.ts#L426)

## joinConcur(separator, concurIterable)

> **joinConcur**(`separator`, `concurIterable`): `Promise`\<`string`\>

Returns a promise that resolves to the result of concatenating the values of
`concurIterable` to a string where values are separated by `separator`.

Like `Array.prototype.join`, but for concur iterables, but does not treat
`null`, `undefined`, or `[]` specially.

### Parameters

• **separator**: `string`

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`unknown`\>

### Returns

`Promise`\<`string`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    joinConcur(`, `),
  ),
)
//=> sloth, more sloth, even more sloth
```

### Defined in

[collect.d.ts:429](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/collect.d.ts#L429)
