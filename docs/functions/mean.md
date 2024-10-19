[**lfi**](../readme.md) • **Docs**

---

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

[statistics.d.ts:166](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L166)
