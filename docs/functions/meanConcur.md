[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / meanConcur

# Function: meanConcur()

> **meanConcur**(`concurIterable`): `Promise`\<`number`\>

Returns a promise that resolves to the mean of the numbers of
`concurIterable`.

Returns a promise that resolves to `NaN` for an empty concur iterable.

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Returns

`Promise`\<`number`\>

## Example

```js
console.log(await meanConcur(asConcur([1, 4, 6, 2])))
//=> 3.25

console.log(await meanConcur(emptyConcur))
//=> NaN
```

## Defined in

[statistics.d.ts:202](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L202)
