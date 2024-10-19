[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / maxConcur

# Function: maxConcur()

> **maxConcur**(`concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

Returns a concur iterable containing a maximum value of `concurIterable` if
`concurIterable` contains at least one value. Otherwise, returns an empty
concur iterable.

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Example

```js
console.log(await pipe(asConcur([4, 1, 5, -3]), maxConcur, getConcur))
//=> 5
```

## Defined in

[statistics.d.ts:1027](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/statistics.d.ts#L1027)
