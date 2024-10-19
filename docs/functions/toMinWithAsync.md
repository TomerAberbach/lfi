[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toMinWithAsync

# Function: toMinWithAsync()

> **toMinWithAsync**\<`Value`\>(`fn`):
> [`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`\>

Returns an async optional reducer that finds the minimum value of the values it
receives by comparing the numerical values of each value, as defined by `fn`.

Use when composing reducers. Prefer [minWithAsync](minWithAsync.md) and
[minWithConcur](minWithConcur.md) for direct use on iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**

## Returns

[`AsyncOptionalReducer`](../type-aliases/AsyncOptionalReducer.md)\<`Value`\>

## Defined in

[statistics.d.ts:579](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L579)
