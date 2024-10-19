[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMinWithAsync

# Function: toMinWithAsync()

> **toMinWithAsync**\<`Value`\>(`fn`): [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`\>

Returns an async optional reducer that finds the minimum value of the values
it receives by comparing the numerical values of each value, as defined by
`fn`.

Use when composing reducers. Prefer [minWithAsync](minWithAsync.md) and
[minWithConcur](minWithConcur.md) for direct use on iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**

## Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`\>

## Defined in

[statistics.d.ts:653](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/statistics.d.ts#L653)
