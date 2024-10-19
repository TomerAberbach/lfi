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

[reducer.d.ts:124](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/reducer.d.ts#L124)
