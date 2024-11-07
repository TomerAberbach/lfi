[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / RawOptionalReducerWithFinish

# Type Alias: RawOptionalReducerWithFinish\<Value, Finished, This\>

> **RawOptionalReducerWithFinish**\<`Value`, `Finished`, `This`\>: [`RawOptionalReducerWithoutFinish`](RawOptionalReducerWithoutFinish.md)\<`Value`, `This`\> & `object`

A reducer that reduces by combining pairs of values using
RawOptionalReducerWithFinish.add and then tranforming the final value
using RawOptionalReducerWithFinish.finish.

## Type declaration

### finish()

> **finish**: (`this`, `acc`) => `Finished`

#### Parameters

• **this**: `This`

• **acc**: `Value`

#### Returns

`Finished`

## Type Parameters

• **Value** = `unknown`

• **Finished** = `Value`

• **This** = `unknown`

## Defined in

[reducers.d.ts:27](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L27)
