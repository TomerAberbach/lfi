[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minMaxConcur

# Function: minMaxConcur()

> **minMaxConcur**(`concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`number`\>\>

Returns a concur iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `concurIterable` if `concurIterable` contains at least one value. Otherwise,
returns an empty concur iterable.

## Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`number`\>\>

## Example

```js
console.log(await pipe(asConcur([4, 1, 5, -3]), minMaxConcur, getConcur))
//=> { min: -3, max: 5 }
```

## Defined in

[statistics.d.ts:1016](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L1016)
