[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / RawOptionalReducerWithFinish

# Type Alias: RawOptionalReducerWithFinish\<Value, Finished, This\>

> **RawOptionalReducerWithFinish**\<`Value`, `Finished`, `This`\>:
> [`RawOptionalReducerWithoutFinish`](RawOptionalReducerWithoutFinish.md)\<`Value`,
> `This`\> & `object`

A reducer that reduces by combining pairs of values using
RawOptionalReducerWithFinish.add and then tranforming the final value using
RawOptionalReducerWithFinish.finish.

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

[reducer.d.ts:25](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L25)
