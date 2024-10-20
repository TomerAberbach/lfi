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

[reducer.d.ts:105](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/reducer.d.ts#L105)
