[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / RawReducerWithFinish

# Type Alias: RawReducerWithFinish\<Value, Acc, Finished, This\>

> **RawReducerWithFinish**\<`Value`, `Acc`, `Finished`, `This`\>: [`RawReducerWithoutFinish`](RawReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\> & `object`

A reducer that reduces by creating an initial accumulator using
RawReducerWithFinish.create, then adding values to the accumulator
values using RawReducerWithFinish.add, and then tranforming the final
accumulator using RawReducerWithFinish.finish.

## Type declaration

### finish()

> **finish**: (`this`, `acc`) => `Finished`

#### Parameters

• **this**: `This`

• **acc**: `Acc`

#### Returns

`Finished`

## Type Parameters

• **Value** = `unknown`

• **Acc** = `Value`

• **Finished** = `Acc`

• **This** = `unknown`

## Defined in

[reducer.d.ts:63](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/reducer.d.ts#L63)
