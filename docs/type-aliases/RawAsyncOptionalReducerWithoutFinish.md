[**lfi**](../readme.md) • **Docs**

***

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

[reducer.d.ts:124](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/reducer.d.ts#L124)
