[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / entries

# Function: entries()

Returns an iterable containing the entries of `object`.

This differs from `Map.prototype.entries` in that the returned iterable can
be iterated multiple times and differs from `Object.entries` in that the
returned iterable is opaque.

## entries(object)

> **entries**\<`Key`, `Value`\>(`object`): `Iterable`\<[`Key`, `Value`], `any`, `any`\>

Returns an iterable containing the entries of `object`.

This differs from `Map.prototype.entries` in that the returned iterable can
be iterated multiple times and differs from `Object.entries` in that the
returned iterable is opaque.

### Type Parameters

• **Key**

• **Value**

### Parameters

• **object**

• **object.entries**

### Returns

`Iterable`\<[`Key`, `Value`], `any`, `any`\>

### Defined in

[generators.d.ts:43](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/generators.d.ts#L43)

## entries(object)

> **entries**\<`Key`, `Value`\>(`object`): `Iterable`\<[`Key`, `Value`], `any`, `any`\>

Returns an iterable containing the entries of `object`.

This differs from `Map.prototype.entries` in that the returned iterable can
be iterated multiple times and differs from `Object.entries` in that the
returned iterable is opaque.

### Type Parameters

• **Key** *extends* `string` \| `number` \| `symbol`

• **Value**

### Parameters

• **object**: `Readonly`\<`Record`\<`Key`, `Value`\>\>

### Returns

`Iterable`\<[`Key`, `Value`], `any`, `any`\>

### Defined in

[generators.d.ts:46](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/generators.d.ts#L46)
