[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minConcur

# Function: minConcur()

> **minConcur**(`concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

Returns a concur iterable containing a minimum value of `concurIterable` if
`concurIterable` contains at least one value. Otherwise, returns an empty concur
iterable.

## Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Example

```js
console.log(await pipe(asConcur([4, 1, 5, -3]), minConcur, getConcur))
//=> -3
```

## Defined in

[statistics.d.ts:891](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L891)
