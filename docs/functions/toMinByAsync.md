[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toMinByAsync

# Function: toMinByAsync()

> **toMinByAsync**\<`Value`\>(`fn`):
> [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`\>

Returns an async optional reducer that finds the minimum value of the values it
receives based on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md)
function.

Use when composing reducers. Prefer [minByAsync](minByAsync.md) and
[minByConcur](minByConcur.md) for direct use on iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

## Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`\>

## Defined in

[statistics.d.ts:241](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L241)
