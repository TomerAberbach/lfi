[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / joinAsync

# Function: joinAsync()

Returns a promise that resolves to the result of concatenating the values of
`asyncIterable` to a string where values are separated by `separator`.

Like `Array.prototype.join`, but for async iterables, but does not treat `null`,
`undefined`, or `[]` specially.

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    joinAsync(`, `),
  ),
)
//=> sloth, more sloth, even more sloth
```

## joinAsync(separator)

> **joinAsync**(`separator`): (`asyncIterable`) => `Promise`\<`string`\>

Returns a promise that resolves to the result of concatenating the values of
`asyncIterable` to a string where values are separated by `separator`.

Like `Array.prototype.join`, but for async iterables, but does not treat `null`,
`undefined`, or `[]` specially.

### Parameters

• **separator**: `string`

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`unknown`, `any`, `any`\>

#### Returns

`Promise`\<`string`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    joinAsync(`, `),
  ),
)
//=> sloth, more sloth, even more sloth
```

### Defined in

[collect.d.ts:401](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L401)

## joinAsync(separator, asyncIterable)

> **joinAsync**(`separator`, `asyncIterable`): `Promise`\<`string`\>

Returns a promise that resolves to the result of concatenating the values of
`asyncIterable` to a string where values are separated by `separator`.

Like `Array.prototype.join`, but for async iterables, but does not treat `null`,
`undefined`, or `[]` specially.

### Parameters

• **separator**: `string`

• **asyncIterable**: `AsyncIterable`\<`unknown`, `any`, `any`\>

### Returns

`Promise`\<`string`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    joinAsync(`, `),
  ),
)
//=> sloth, more sloth, even more sloth
```

### Defined in

[collect.d.ts:404](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L404)
