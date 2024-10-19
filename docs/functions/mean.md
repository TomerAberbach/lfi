[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / mean

# Function: mean()

> **mean**(`iterable`): `number`

Returns the mean of the numbers of `iterable`.

Returns `NaN` for an empty iterable.

## Parameters

• **iterable**: `Iterable`\<`number`, `any`, `any`\>

## Returns

`number`

## Example

```js
console.log(mean([1, 4, 6, 2]))
//=> 3.25

console.log(mean([]))
//=> NaN
```

## Defined in

[statistics.d.ts:166](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/statistics.d.ts#L166)
