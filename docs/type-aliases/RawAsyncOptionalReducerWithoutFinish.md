[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / RawAsyncOptionalReducerWithoutFinish

# Type Alias: RawAsyncOptionalReducerWithoutFinish\<Value, This\>

> **RawAsyncOptionalReducerWithoutFinish**\<`Value`, `This`\>: `object`

An async reducer that reduces by combining pairs of values using
RawAsyncOptionalReducerWithoutFinish.add.

## Type Parameters

• **Value** = `unknown`

• **This** = `unknown`

## Type declaration

### add()

> **add**: (`this`, `acc`, `value`) => `MaybePromiseLike`\<`Value`\>

#### Parameters

• **this**: `This`

• **acc**: `Value`

• **value**: `Value`

#### Returns

`MaybePromiseLike`\<`Value`\>

## Defined in

[reducer.d.ts:124](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/reducer.d.ts#L124)
