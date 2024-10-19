[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / minMaxConcur

# Function: minMaxConcur()

> **minMaxConcur**(`concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`number`\>\>

Returns a concur iterable containing a [MinMax](../type-aliases/MinMax.md) value of
`concurIterable` if `concurIterable` contains at least one value. Otherwise,
returns an empty concur iterable.

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`number`\>\>

## Example

```js
console.log(await pipe(asConcur([4, 1, 5, -3]), minMaxConcur, getConcur))
//=> { min: -3, max: 5 }
```

## Defined in

[statistics.d.ts:1090](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/statistics.d.ts#L1090)
