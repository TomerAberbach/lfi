[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / RawAsyncOptionalReducerWithFinish

# Type Alias: RawAsyncOptionalReducerWithFinish\<Value, Finished, This\>

> **RawAsyncOptionalReducerWithFinish**\<`Value`, `Finished`, `This`\>: [`RawAsyncOptionalReducerWithoutFinish`](RawAsyncOptionalReducerWithoutFinish.md)\<`Value`, `This`\> & `object`

An async reducer that reduces by combining pairs of values using
RawAsyncOptionalReducerWithFinish.add and then tranforming the final
value using RawAsyncOptionalReducerWithFinish.finish.

## Type declaration

### finish()

> **finish**: (`this`, `acc`) => `MaybePromiseLike`\<`Finished`\>

#### Parameters

• **this**: `This`

• **acc**: `Value`

#### Returns

`MaybePromiseLike`\<`Finished`\>

## Type Parameters

• **Value** = `unknown`

• **Finished** = `Value`

• **This** = `unknown`

## Defined in

reducers.d.ts:138
