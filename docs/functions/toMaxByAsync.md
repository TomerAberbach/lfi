[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toMaxByAsync

# Function: toMaxByAsync()

> **toMaxByAsync**\<`Value`\>(`fn`):
> [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`\>

Returns an async optional reducer that finds the maximum value of the values it
receives based on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md)
function.

Use when composing reducers. Prefer [maxByAsync](maxByAsync.md) and
[maxByConcur](maxByConcur.md) for direct use on iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

## Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`\>

## Defined in

[statistics.d.ts:328](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L328)
