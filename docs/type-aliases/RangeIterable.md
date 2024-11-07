[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / RangeIterable

# Type Alias: RangeIterable

> **RangeIterable**: `Iterable`\<`number`\> & `object`

An iterable that yields integers in a range. Has a method for obtaining a new
iterable that skips numbers in steps.

## Type declaration

### step()

> **step**: \<`Step`\>(`step`) => `Iterable`\<`number`\>

Returns an iterable that yields integers in the same range as the original
[RangeIterable](RangeIterable.md), but steps through the range in increments of `step`
instead of 1.

#### Type Parameters

• **Step** *extends* `number`

#### Parameters

• **step**: `PositiveInteger`\<`Step`\>

#### Returns

`Iterable`\<`number`\>

#### Throws

if `step` is not a positive integer.

## Defined in

[generators.d.ts:159](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/generators.d.ts#L159)
