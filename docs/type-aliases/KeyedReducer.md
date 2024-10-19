[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / KeyedReducer

# Type Alias: KeyedReducer\<Key, Value, Acc\>

> **KeyedReducer**\<`Key`, `Value`, `Acc`\>:
> [`RawKeyedReducer`](RawKeyedReducer.md)\<`Key`, `Value`, `Acc`\>

A keyed reducer that reduces by creating an initial accumulator using
KeyedReducer.create and then adding key-value pairs to the accumulator values
using KeyedReducer.add. The accumulator can be queried for values by key using
KeyedReducer.get.

## Type Parameters

• **Key** = `unknown`

• **Value** = `unknown`

• **Acc** = [`Key`, `Value`]

## Defined in

[reducer.d.ts:105](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reducer.d.ts#L105)
