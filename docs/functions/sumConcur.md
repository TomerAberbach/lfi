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

[statistics.d.ts:128](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/statistics.d.ts#L128)
