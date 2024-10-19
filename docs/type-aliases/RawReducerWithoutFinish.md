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

[reducer.d.ts:48](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L48)
