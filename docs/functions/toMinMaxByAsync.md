[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toMinMaxByAsync

# Function: toMinMaxByAsync()

> **toMinMaxByAsync**\<`Value`\>(`fn`):
> [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

Returns an async optional reducer that finds the
[MinMax](../type-aliases/MinMax.md) value of the values it receives based on the
`fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function.

Use when composing reducers. Prefer [minMaxByAsync](minMaxByAsync.md) and
[minMaxByConcur](minMaxByConcur.md) for direct use on iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

## Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

## Defined in

[statistics.d.ts:428](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L428)
