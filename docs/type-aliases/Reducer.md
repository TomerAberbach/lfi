[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / Reducer

# Type Alias: Reducer\<Value, Acc, Finished\>

> **Reducer**\<`Value`, `Acc`, `Finished`\>: [`RawReducerWithFinish`](RawReducerWithFinish.md)\<`Value`, `Acc`, `Finished`\>

A reducer that reduces by creating an initial accumulator using
Reducer.create, then adding values to the accumulator values using
Reducer.add, and then tranforming the final accumulator using
Reducer.finish.

## Type Parameters

• **Value** = `unknown`

• **Acc** = `Value`

• **Finished** = `Acc`

## Defined in

[reducer.d.ts:78](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/reducer.d.ts#L78)
