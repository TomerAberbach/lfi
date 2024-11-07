[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / firstConcur

# Function: firstConcur()

> **firstConcur**\<`Value`\>(`concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the first value of `concurIterable`, or
an empty concur iterable if `concurIterable` is empty.

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
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    firstConcur,
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth' ]
```

## Defined in

splices.d.ts:380
