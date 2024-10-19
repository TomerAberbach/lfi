[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / RawKeyedReducer

# Type Alias: RawKeyedReducer\<Key, Value, Acc, This\>

> **RawKeyedReducer**\<`Key`, `Value`, `Acc`, `This`\>:
> [`RawReducerWithoutFinish`](RawReducerWithoutFinish.md)\<readonly [`Key`,
> > `Value`], `Acc`, `This`\> & `object`

A keyed reducer that reduces by creating an initial accumulator using
RawKeyedReducer.create and then adding key-value pairs to the accumulator values
using RawKeyedReducer.add. The accumulator can be queried for values by key
using RawKeyedReducer.get.

## Type declaration

### get()

> **get**: (`this`, `acc`, `key`) => `Value` \| _typeof_ >
> [`NO_ENTRY`](../variables/NO_ENTRY.md)

#### Parameters

• **this**: `This`

• **acc**: `Acc`

• **key**: `Key`

#### Returns

`Value` \| _typeof_ [`NO_ENTRY`](../variables/NO_ENTRY.md)

## Type Parameters

• **Key** = `unknown`

• **Value** = `unknown`

• **Acc** = [`Key`, `Value`]

• **This** = `unknown`

## Defined in

[reducer.d.ts:90](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reducer.d.ts#L90)