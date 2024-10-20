[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMaxWithAsync

# Function: toMaxWithAsync()

> **toMaxWithAsync**\<`Value`\>(`fn`): [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`\>

Returns an async optional reducer that finds the maximum value of the values
it receives by comparing the numerical values of each value, as defined by
`fn`.

Use when composing reducers. Prefer [maxWithAsync](maxWithAsync.md) and
[maxWithConcur](maxWithConcur.md) for direct use on iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**

## Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`\>

## Defined in

[statistics.d.ts:743](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L743)
