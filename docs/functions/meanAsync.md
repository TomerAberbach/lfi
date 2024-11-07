[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / meanAsync

# Function: meanAsync()

> **meanAsync**(`asyncIterable`): `Promise`\<`number`\>

Returns a promise that resolves to the mean of the numbers of
`asyncIterable`.

Returns a promise that resolves to `NaN` for an empty async iterable.

## Parameters

• **asyncIterable**: `AsyncIterable`\<`number`, `any`, `any`\>

## Returns

`Promise`\<`number`\>

## Example

```js
console.log(await meanAsync(asAsync([1, 4, 6, 2])))
//=> 3.25

console.log(await meanAsync(emptyAsync))
//=> NaN
```

## Defined in

[statistics.d.ts:183](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L183)
