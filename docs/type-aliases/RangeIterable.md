[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / RangeIterable

# Type Alias: RangeIterable

> **RangeIterable**: `Iterable`\<`number`\> & `object`

An iterable that yields integers in a range. Has a method for obtaining a new
iterable that skips numbers in steps.

## Type declaration

### step()

> **step**: \<`Step`\>(`step`) => `Iterable`\<`number`\>

Returns an iterable that yields integers in the same range as the original
[RangeIterable](RangeIterable.md), but steps through the range in increments of
`step` instead of 1.

#### Type Parameters

• **Step** _extends_ `number`

#### Parameters

• **step**: `PositiveInteger`\<`Step`\>

#### Returns

`Iterable`\<`number`\>

#### Throws

if `step` is not a positive integer.

## Defined in

[generate.d.ts:115](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/generate.d.ts#L115)
