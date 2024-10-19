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

[reducer.d.ts:78](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/reducer.d.ts#L78)
