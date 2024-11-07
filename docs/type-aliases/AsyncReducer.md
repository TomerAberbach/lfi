[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / AsyncReducer

# Type Alias: AsyncReducer\<Value, Acc, Finished\>

> **AsyncReducer**\<`Value`, `Acc`, `Finished`\>: [`RawAsyncReducerWithFinish`](RawAsyncReducerWithFinish.md)\<`Value`, `Acc`, `Finished`\>

An async reducer that reduces by creating an initial accumulator using
AsyncReducer.create, then adding values to the accumulator values
using AsyncReducer.add, and then tranforming the final accumulator
using AsyncReducer.finish. The async reducer is optionally able to
combine pairs of accumulators using AsyncReducer.combine.

## Type Parameters

• **Value** = `unknown`

• **Acc** = `Value`

• **Finished** = `Acc`

## Defined in

reducers.d.ts:198
