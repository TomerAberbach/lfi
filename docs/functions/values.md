[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / values

# Function: values()

> **values**\<`Value`\>(`object`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `object`.

This differs from `Map.prototype.values` and `Set.prototype.values` in that the
returned iterable can be iterated multiple times and differs from
`Object.values` in that the returned iterable is opaque.

## Type Parameters

• **Value**

## Parameters

• **object**: `ReadonlyMap`\<`unknown`, `Value`\> \| `ReadonlySet`\<`Value`\> \|
`Readonly`\<`Record`\<`string` \| `number` \| `symbol`, `Value`\>\>

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Defined in

[from.d.ts:22](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/from.d.ts#L22)