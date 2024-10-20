[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / minMax

# Function: minMax()

> **minMax**(`iterable`): `Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`number`\>, `any`, `any`\>

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of `iterable` if
`iterable` contains at least one value. Otherwise, returns an empty iterable.

## Parameters

• **iterable**: `Iterable`\<`number`, `any`, `any`\>

## Returns

`Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`number`\>, `any`, `any`\>

## Example

```js
console.log(pipe([4, 1, 5, -3], minMax, get))
//=> { min: -3, max: 5 }
```

## Defined in

[statistics.d.ts:1062](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L1062)
