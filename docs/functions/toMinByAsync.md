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

[statistics.d.ts:315](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L315)
