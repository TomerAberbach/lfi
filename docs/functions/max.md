[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / max

# Function: max()

> **max**(`iterable`): `Iterable`\<`number`, `any`, `any`\>

Returns an iterable containing a maximum value of `iterable` if `iterable`
contains at least one value. Otherwise, returns an empty iterable.

## Parameters

• **iterable**: `Iterable`\<`number`, `any`, `any`\>

## Returns

`Iterable`\<`number`, `any`, `any`\>

## Example

```js
console.log(pipe([4, 1, 5, -3], max, get))
//=> 5
```

## Defined in

[statistics.d.ts:999](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L999)
