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

[statistics.d.ts:128](https://github.com/TomerAberbach/lfi/blob/95b3b82a9fc32cec65089cf86d003d7620dc44fc/src/operations/statistics.d.ts#L128)
