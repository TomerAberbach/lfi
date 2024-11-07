[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / concatConcur

# Function: concatConcur()

> **concatConcur**\<`Value`\>(...`iterables`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable that contains the values of each iterable in
`iterables`.

Like `Array.prototype.concat`, but for concur iterables.

## Type Parameters

• **Value**

## Parameters

• ...**iterables**: readonly ([`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\> \| `Iterable`\<`Value`, `any`, `any`\> \| `AsyncIterable`\<`Value`, `any`, `any`\>)[]

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Example

```js
console.log(
  await pipe(
    concatConcur(asAsync([1, 2]), [3, `sloth`, 5], asConcur([6, 7])),
    reduceConcur(toArray()),
  ),
)
//=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
```

## Defined in

splices.d.ts:1124
