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

reducers.d.ts:80
