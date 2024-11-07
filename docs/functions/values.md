[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / values

# Function: values()

> **values**\<`Value`\>(`object`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `object`.

This differs from `Map.prototype.values` and `Set.prototype.values` in that
the returned iterable can be iterated multiple times and differs from
`Object.values` in that the returned iterable is opaque.

## Type Parameters

• **Value**

## Parameters

• **object**: `ReadonlyMap`\<`unknown`, `Value`\> \| `ReadonlySet`\<`Value`\> \| `Readonly`\<`Record`\<`string` \| `number` \| `symbol`, `Value`\>\>

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Defined in

[generators.d.ts:28](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/generators.d.ts#L28)
