[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / AsyncKeyedReducer

# Type Alias: AsyncKeyedReducer\<Key, Value, Acc\>

> **AsyncKeyedReducer**\<`Key`, `Value`, `Acc`\>: [`RawAsyncKeyedReducer`](RawAsyncKeyedReducer.md)\<`Key`, `Value`, `Acc`\>

An async keyed reducer that reduces by creating an initial accumulator using
AsyncKeyedReducer.create and then adding key-value pairs to the
accumulator values using AsyncKeyedReducer.add. The async keyed
reducer is optionally able to combine pairs of accumulators using
AsyncKeyedReducer.combine. The accumulator can be queried for values
by key using AsyncKeyedReducer.get.

## Type Parameters

• **Key** = `unknown`

• **Value** = `unknown`

• **Acc** = [`Key`, `Value`]

## Defined in

[reducer.d.ts:231](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L231)
