[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / firstConcur

# Function: firstConcur()

> **firstConcur**\<`Value`\>(`concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the first value of `concurIterable`, or an
empty concur iterable if `concurIterable` is empty.

## Type Parameters

• **Value**

## Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Example

```
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    firstConcur,
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth' ]
```

## Defined in

[slice.d.ts:379](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/slice.d.ts#L379)
