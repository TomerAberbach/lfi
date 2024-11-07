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

[statistics.d.ts:183](https://github.com/TomerAberbach/lfi/blob/95b3b82a9fc32cec65089cf86d003d7620dc44fc/src/operations/statistics.d.ts#L183)
