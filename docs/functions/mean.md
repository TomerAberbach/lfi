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

[statistics.d.ts:166](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L166)
