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

[reducer.d.ts:124](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/reducer.d.ts#L124)
