[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / entries

# Function: entries()

Returns an iterable containing the entries of `object`.

This differs from `Map.prototype.entries` in that the returned iterable can be
iterated multiple times and differs from `Object.entries` in that the returned
iterable is opaque.

## entries(object)

> **entries**\<`Key`, `Value`\>(`object`): `Iterable`\<[`Key`, `Value`], `any`, `any`\>

Returns an iterable containing the entries of `object`.

This differs from `Map.prototype.entries` in that the returned iterable can be
iterated multiple times and differs from `Object.entries` in that the returned
iterable is opaque.

### Type Parameters

• **Key**

• **Value**

### Parameters

• **object**

• **object.entries**

### Returns

`Iterable`\<[`Key`, `Value`], `any`, `any`\>

### Defined in

[from.d.ts:37](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/from.d.ts#L37)

## entries(object)

> **entries**\<`Key`, `Value`\>(`object`): `Iterable`\<[`Key`, `Value`], `any`, `any`\>

Returns an iterable containing the entries of `object`.

This differs from `Map.prototype.entries` in that the returned iterable can be
iterated multiple times and differs from `Object.entries` in that the returned
iterable is opaque.

### Type Parameters

• **Key** _extends_ `string` \| `number` \| `symbol`

• **Value**

### Parameters

• **object**: `Readonly`\<`Record`\<`Key`, `Value`\>\>

### Returns

`Iterable`\<[`Key`, `Value`], `any`, `any`\>

### Defined in

[from.d.ts:40](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/from.d.ts#L40)
