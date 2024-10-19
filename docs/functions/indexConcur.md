[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / indexConcur

# Function: indexConcur()

> **indexConcur**\<`Value`\>(`concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`number`, `Value`]\>

Returns a concur iterable equivalent to `concurIterable` except each value of
`concurIterable` is placed in an entry containing the value's 0-based index in
the iteration order followed by the value itself.

## Type Parameters

• **Value**

## Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<[`number`, `Value`]\>

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    indexConcur,
    reduceConcur(toArray()),
  ),
)
//=> [ [ 0, 'sloth' ], [ 1, 'more sloth' ], [ 2, 'even more sloth' ] ]
```

## Defined in

[transform.d.ts:309](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/transform.d.ts#L309)
