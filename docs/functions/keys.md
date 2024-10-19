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

[from.d.ts:9](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/from.d.ts#L9)

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

[from.d.ts:10](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/from.d.ts#L10)
