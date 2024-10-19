[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / RawAsyncReducerWithoutFinish

# Type Alias: RawAsyncReducerWithoutFinish\<Value, Acc, This\>

> **RawAsyncReducerWithoutFinish**\<`Value`, `Acc`, `This`\>: `object`

An async reducer that reduces by creating an initial accumulator using
RawAsyncReducerWithoutFinish.create and then adding values to the accumulator
values using RawAsyncReducerWithoutFinish.add. The async reducer is optionally
able to combine pairs of accumulators using
RawAsyncReducerWithoutFinish.combine.

## Type Parameters

• **Value** = `unknown`

• **Acc** = `Value`

• **This** = `unknown`

## Type declaration

### add()

> **add**: (`this`, `acc`, `value`) => `MaybePromiseLike`\<`Acc`\>

#### Parameters

• **this**: `This`

• **acc**: `Acc`

• **value**: `Value`

#### Returns

`MaybePromiseLike`\<`Acc`\>

### combine()?

> `optional` **combine**: (`this`, `acc1`, `acc2`) =>
> `MaybePromiseLike`\<`Acc`\>

#### Parameters

• **this**: `This`

• **acc1**: `Acc`

• **acc2**: `Acc`

#### Returns

`MaybePromiseLike`\<`Acc`\>

### create()

> **create**: (`this`) => `MaybePromiseLike`\<`Acc`\>

#### Parameters

• **this**: `This`

#### Returns

`MaybePromiseLike`\<`Acc`\>

## Defined in

[reducer.d.ts:161](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/reducer.d.ts#L161)
