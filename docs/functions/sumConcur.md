[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / sumConcur

# Function: sumConcur()

> **sumConcur**(`concurIterable`): `Promise`\<`number`\>

Returns a promise that resolves to the sum of the numbers of
`concurIterable`.

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Returns

`Promise`\<`number`\>

## Example

```js
console.log(await sumConcur(asConcur([1, 4, 6, 2])))
//=> 3
```

## Defined in

[statistics.d.ts:128](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L128)
