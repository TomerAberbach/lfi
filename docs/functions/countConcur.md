[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / countConcur

# Function: countConcur()

> **countConcur**\<`Value`\>(`concurIterable`): `Promise`\<`number`\>

Returns a promise that resolves to the number of values in `concurIterable`.

Like `Array.prototype.length`, but for concur iterables.

## Type Parameters

• **Value**

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Returns

`Promise`\<`number`\>

## Example

```js
console.log(
  await countConcur(asConcur([`sloth`, `more sloth`, `even more sloth`])),
)
//=> 3
```

## Defined in

[statistics.d.ts:72](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L72)
