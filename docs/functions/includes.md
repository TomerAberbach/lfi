[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / includes

# Function: includes()

Returns `true` if any value of `iterable` is equal to `searchElement` using
`Object.is`. Otherwise returns `false`.

Like `Array.prototype.includes`, but for iterables.

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    includes(3),
  ),
)
//=> true
```

## includes(searchElement)

> **includes**(`searchElement`): \<`Value`\>(`iterable`) => `boolean`

Returns `true` if any value of `iterable` is equal to `searchElement` using
`Object.is`. Otherwise returns `false`.

Like `Array.prototype.includes`, but for iterables.

### Parameters

• **searchElement**: `unknown`

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`boolean`

### Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    includes(3),
  ),
)
//=> true
```

### Defined in

[predicate.d.ts:221](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/predicate.d.ts#L221)

## includes(searchElement, iterable)

> **includes**\<`Value`\>(`searchElement`, `iterable`): `boolean`

Returns `true` if any value of `iterable` is equal to `searchElement` using
`Object.is`. Otherwise returns `false`.

Like `Array.prototype.includes`, but for iterables.

### Type Parameters

• **Value**

### Parameters

• **searchElement**: `unknown`

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`boolean`

### Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    includes(3),
  ),
)
//=> true
```

### Defined in

[predicate.d.ts:222](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/predicate.d.ts#L222)
