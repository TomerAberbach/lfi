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

[statistics.d.ts:965](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L965)