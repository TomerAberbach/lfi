[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / RawAsyncReducerWithFinish

# Type Alias: RawAsyncReducerWithFinish\<Value, Acc, Finished, This\>

> **RawAsyncReducerWithFinish**\<`Value`, `Acc`, `Finished`, `This`\>: [`RawAsyncReducerWithoutFinish`](RawAsyncReducerWithoutFinish.md)\<`Value`, `Acc`, `This`\> & `object`

An async reducer that reduces by creating an initial accumulator using
RawAsyncReducerWithFinish.create, then adding values to the
accumulator values using RawAsyncReducerWithFinish.add, and then
tranforming the final accumulator using
RawAsyncReducerWithFinish.finish. The async
reducer is optionally able to combine pairs of accumulators using
RawAsyncReducerWithFinish.combine.

## Type declaration

### finish()

> **finish**: (`this`, `acc`) => `MaybePromiseLike`\<`Finished`\>

#### Parameters

• **this**: `This`

• **acc**: `Acc`

#### Returns

`MaybePromiseLike`\<`Finished`\>

## Type Parameters

• **Value** = `unknown`

• **Acc** = `Value`

• **Finished** = `Acc`

• **This** = `unknown`

## Defined in

reducers.d.ts:182
