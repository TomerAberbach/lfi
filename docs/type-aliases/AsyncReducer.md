[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / AsyncReducer

# Type Alias: AsyncReducer\<Value, Acc, Finished\>

> **AsyncReducer**\<`Value`, `Acc`, `Finished`\>:
> [`RawAsyncReducerWithFinish`](RawAsyncReducerWithFinish.md)\<`Value`, `Acc`,
> `Finished`\>

An async reducer that reduces by creating an initial accumulator using
AsyncReducer.create, then adding values to the accumulator values using
AsyncReducer.add, and then tranforming the final accumulator using
AsyncReducer.finish. The async reducer is optionally able to combine pairs of
accumulators using AsyncReducer.combine.

## Type Parameters

• **Value** = `unknown`

• **Acc** = `Value`

• **Finished** = `Acc`

## Defined in

[reducer.d.ts:196](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reducer.d.ts#L196)
