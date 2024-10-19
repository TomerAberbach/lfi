[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / AsyncCompare

# Type Alias: AsyncCompare()\<Value\>

> **AsyncCompare**\<`Value`\>: (`left`, `right`) => `MaybePromiseLike`\<`number`\>

A function that compares two values of type `Value` possibly asynchronously.

A return value that awaits to:
- Less than zero implies `left < right`
- Equal to zero implies `left === right`
- Greater than zero implies `left > right`

## Type Parameters

• **Value**

## Parameters

• **left**: `Value`

• **right**: `Value`

## Returns

`MaybePromiseLike`\<`number`\>

## Defined in

[statistics.d.ts:224](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/statistics.d.ts#L224)
