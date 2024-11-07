[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / RawAsyncKeyedReducer

# Type Alias: RawAsyncKeyedReducer\<Key, Value, Acc, This\>

> **RawAsyncKeyedReducer**\<`Key`, `Value`, `Acc`, `This`\>: [`RawAsyncReducerWithoutFinish`](RawAsyncReducerWithoutFinish.md)\<readonly [`Key`, `Value`], `Acc`, `This`\> & `object`

An async keyed reducer that reduces by creating an initial accumulator using
RawAsyncKeyedReducer.create and then adding key-value pairs to the
accumulator values using RawAsyncKeyedReducer.add. The async keyed
reducer is optionally able to combine pairs of accumulators using
RawAsyncKeyedReducer.combine. The accumulator can be queried for
values by key using RawAsyncKeyedReducer.get.

## Type declaration

### get()

> **get**: (`this`, `acc`, `key`) => `MaybePromiseLike`\<`Value` \| *typeof* [`NO_ENTRY`](../variables/NO_ENTRY.md)\>

#### Parameters

• **this**: `This`

• **acc**: `Acc`

• **key**: `Key`

#### Returns

`MaybePromiseLike`\<`Value` \| *typeof* [`NO_ENTRY`](../variables/NO_ENTRY.md)\>

## Type Parameters

• **Key** = `unknown`

• **Value** = `unknown`

• **Acc** = [`Key`, `Value`]

• **This** = `unknown`

## Defined in

[reducers.d.ts:212](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L212)
