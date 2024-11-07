[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / uniqueConcur

# Function: uniqueConcur()

> **uniqueConcur**\<`Value`\>(`concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` in
iteration order, except values are deduplicated if they are equal using
`Object.is`.

## Type Parameters

• **Value**

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

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

[filters.d.ts:431](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L431)
