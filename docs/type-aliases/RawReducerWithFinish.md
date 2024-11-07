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

[reducers.d.ts:65](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L65)
