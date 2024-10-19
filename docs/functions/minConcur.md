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

[statistics.d.ts:965](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L965)
