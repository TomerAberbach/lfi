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

[statistics.d.ts:72](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/statistics.d.ts#L72)
