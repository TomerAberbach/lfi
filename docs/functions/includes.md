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

[predicates.d.ts:221](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/predicates.d.ts#L221)

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

[predicates.d.ts:222](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/predicates.d.ts#L222)
