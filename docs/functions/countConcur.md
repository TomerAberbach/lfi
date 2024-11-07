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

[statistics.d.ts:72](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L72)
