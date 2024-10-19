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

[from.d.ts:22](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/from.d.ts#L22)
