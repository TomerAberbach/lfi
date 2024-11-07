[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / KeyedReducer

# Type Alias: KeyedReducer\<Key, Value, Acc\>

> **KeyedReducer**\<`Key`, `Value`, `Acc`\>: [`RawKeyedReducer`](RawKeyedReducer.md)\<`Key`, `Value`, `Acc`\>

A keyed reducer that reduces by creating an initial accumulator using
KeyedReducer.create and then adding key-value pairs to the
accumulator values using KeyedReducer.add. The accumulator can be
queried for values by key using KeyedReducer.get.

## Type Parameters

• **Key** = `unknown`

• **Value** = `unknown`

• **Acc** = [`Key`, `Value`]

## Defined in

[reducers.d.ts:107](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L107)
