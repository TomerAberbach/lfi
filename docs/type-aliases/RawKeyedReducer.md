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

[reducer.d.ts:90](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/reducer.d.ts#L90)
