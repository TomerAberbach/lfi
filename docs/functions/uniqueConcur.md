[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / uniqueConcur

# Function: uniqueConcur()

> **uniqueConcur**\<`Value`\>(`concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` in iteration
order, except values are deduplicated if they are equal using `Object.is`.

## Type Parameters

• **Value**

## Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `not sloth`, `sloth`]),
    uniqueConcur,
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'not sloth' ]
```

## Defined in

[exclude.d.ts:430](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/exclude.d.ts#L430)
