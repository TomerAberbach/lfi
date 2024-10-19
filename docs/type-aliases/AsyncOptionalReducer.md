[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / AsyncOptionalReducer

# Type Alias: AsyncOptionalReducer\<Value, Finished\>

> **AsyncOptionalReducer**\<`Value`, `Finished`\>:
> [`RawAsyncOptionalReducerWithFinish`](RawAsyncOptionalReducerWithFinish.md)\<`Value`,
> `Finished`\>

An async reducer that reduces by combining pairs of values using
AsyncOptionalReducer.add and then tranforming the final value using
AsyncOptionalReducer.finish.

## Type Parameters

• **Value** = `unknown`

• **Finished** = `Value`

## Defined in

[reducer.d.ts:149](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reducer.d.ts#L149)
