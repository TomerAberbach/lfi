[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / RawReducerWithoutFinish

# Type Alias: RawReducerWithoutFinish\<Value, Acc, This\>

> **RawReducerWithoutFinish**\<`Value`, `Acc`, `This`\>: `object`

A reducer that reduces by creating an initial accumulator using
RawReducerWithoutFinish.create and then adding values to the
accumulator values using RawReducerWithoutFinish.add.

## Type Parameters

• **Value** = `unknown`

• **Acc** = `Value`

• **This** = `unknown`

## Type declaration

### add()

> **add**: (`this`, `acc`, `value`) => `Acc`

#### Parameters

• **this**: `This`

• **acc**: `Acc`

• **value**: `Value`

#### Returns

`Acc`

### create()

> **create**: (`this`) => `Acc`

#### Parameters

• **this**: `This`

#### Returns

`Acc`

## Defined in

[reducers.d.ts:50](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L50)
