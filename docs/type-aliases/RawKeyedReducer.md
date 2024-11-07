[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / RawKeyedReducer

# Type Alias: RawKeyedReducer\<Key, Value, Acc, This\>

> **RawKeyedReducer**\<`Key`, `Value`, `Acc`, `This`\>: [`RawReducerWithoutFinish`](RawReducerWithoutFinish.md)\<readonly [`Key`, `Value`], `Acc`, `This`\> & `object`

A keyed reducer that reduces by creating an initial accumulator using
RawKeyedReducer.create and then adding key-value pairs to the
accumulator values using RawKeyedReducer.add. The accumulator can be
queried for values by key using RawKeyedReducer.get.

## Type declaration

### get()

> **get**: (`this`, `acc`, `key`) => `Value` \| *typeof* [`NO_ENTRY`](../variables/NO_ENTRY.md)

#### Parameters

• **this**: `This`

• **acc**: `Acc`

• **key**: `Key`

#### Returns

`Value` \| *typeof* [`NO_ENTRY`](../variables/NO_ENTRY.md)

## Type Parameters

• **Key** = `unknown`

• **Value** = `unknown`

• **Acc** = [`Key`, `Value`]

• **This** = `unknown`

## Defined in

[reducers.d.ts:92](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L92)
