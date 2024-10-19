[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / lastConcur

# Function: lastConcur()

> **lastConcur**\<`Value`\>(`concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the last value of `concurIterable`, or
an empty concur iterable if `concurIterable` is empty.

## Type Parameters

• **Value**

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Example

```
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    lastConcur,
    reduceConcur(toArray()),
  ),
)
//=> [ 'even more sloth' ]
```

## Defined in

[slice.d.ts:437](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/slice.d.ts#L437)
