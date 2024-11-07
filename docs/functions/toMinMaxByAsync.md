[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMinMaxByAsync

# Function: toMinMaxByAsync()

> **toMinMaxByAsync**\<`Value`\>(`fn`): [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

Returns an async optional reducer that finds the [MinMax](../type-aliases/MinMax.md) value of the
values it receives based on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function.

Use when composing reducers. Prefer [minMaxByAsync](minMaxByAsync.md) and
[minMaxByConcur](minMaxByConcur.md) for direct use on iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

## Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

## Defined in

[statistics.d.ts:502](https://github.com/TomerAberbach/lfi/blob/95b3b82a9fc32cec65089cf86d003d7620dc44fc/src/operations/statistics.d.ts#L502)
