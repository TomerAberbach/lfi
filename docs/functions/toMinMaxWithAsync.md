[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMinMaxWithAsync

# Function: toMinMaxWithAsync()

> **toMinMaxWithAsync**\<`Value`\>(`fn`): [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

Returns an async optional reducer that finds the [MinMax](../type-aliases/MinMax.md) value of the
values it receives by comparing the numerical values of each value, as
defined by `fn`.

Use when composing reducers. Prefer [minMaxWithAsync](minMaxWithAsync.md) and
[minMaxWithConcur](minMaxWithConcur.md) for direct use on iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**

## Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

## Defined in

[statistics.d.ts:847](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L847)
