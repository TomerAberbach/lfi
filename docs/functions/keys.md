[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / keys

# Function: keys()

Returns an iterable containing the keys of `object`.

This differs from `Map.prototype.keys` in that the returned iterable can be
iterated multiple times and differs from `Object.keys` in that the returned
iterable is opaque.

## keys(object)

> **keys**\<`Key`\>(`object`): `Iterable`\<`Key`, `any`, `any`\>

Returns an iterable containing the keys of `object`.

This differs from `Map.prototype.keys` in that the returned iterable can be
iterated multiple times and differs from `Object.keys` in that the returned
iterable is opaque.

### Type Parameters

• **Key**

### Parameters

• **object**: `ReadonlyMap`\<`Key`, `unknown`\>

### Returns

`Iterable`\<`Key`, `any`, `any`\>

### Defined in

generators.d.ts:15

## keys(object)

> **keys**\<`Key`\>(`object`): `Iterable`\<`Key`, `any`, `any`\>

Returns an iterable containing the keys of `object`.

This differs from `Map.prototype.keys` in that the returned iterable can be
iterated multiple times and differs from `Object.keys` in that the returned
iterable is opaque.

### Type Parameters

• **Key** *extends* `string` \| `number` \| `symbol`

### Parameters

• **object**: `Readonly`\<`Record`\<`Key`, `unknown`\>\>

### Returns

`Iterable`\<`Key`, `any`, `any`\>

### Defined in

generators.d.ts:16
