[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / min

# Function: min()

> **min**(`iterable`): `Iterable`\<`number`, `any`, `any`\>

Returns an iterable containing a minimum value of `iterable` if `iterable`
contains at least one value. Otherwise, returns an empty iterable.

## Parameters

• **iterable**: `Iterable`\<`number`, `any`, `any`\>

## Returns

`Iterable`\<`number`, `any`, `any`\>

## Example

```js
console.log(pipe([4, 1, 5, -3], min, get))
//=> -3
```

## Defined in

[statistics.d.ts:937](https://github.com/TomerAberbach/lfi/blob/95b3b82a9fc32cec65089cf86d003d7620dc44fc/src/operations/statistics.d.ts#L937)
