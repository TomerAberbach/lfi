[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / minConcur

# Function: minConcur()

> **minConcur**(`concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

Returns a concur iterable containing a minimum value of `concurIterable` if
`concurIterable` contains at least one value. Otherwise, returns an empty
concur iterable.

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Example

```js
console.log(await pipe(asConcur([4, 1, 5, -3]), minConcur, getConcur))
//=> -3
```

## Defined in

[statistics.d.ts:965](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L965)
