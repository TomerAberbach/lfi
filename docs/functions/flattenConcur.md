[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / flattenConcur

# Function: flattenConcur()

> **flattenConcur**\<`Value`\>(`concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable that contains the values of each iterable in
`concurIterable`.

Like `Array.prototype.flat`, but for concur iterables.

Unlike [concat](concat.md) and [concatAsync](concatAsync.md), this function does not
necessarily iterate over each iterable in sequence.

## Type Parameters

• **Value**

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Iterable`\<`Value`, `any`, `any`\> \| `AsyncIterable`\<`Value`, `any`, `any`\> \| [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Example

```js
console.log(
  await pipe(
    asConcur([asConcur([1, 2]), [3, `sloth`, 5], asAsync([6, 7])]),
    flattenConcur,
    reduceConcur(toArray()),
  ),
)
//=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
```

## Defined in

[transform.d.ts:244](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/transform.d.ts#L244)
