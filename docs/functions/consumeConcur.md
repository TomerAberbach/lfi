[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / consumeConcur

# Function: consumeConcur()

> **consumeConcur**(`concurIterable`): `Promise`\<`void`\>

Iterates through the `concurIterable` causing lazy operations to run.

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`unknown`\>

## Returns

`Promise`\<`void`\>

## Example

```js
const concurIterable = pipe(
  asConcur([`sloth`, 2, 3]),
  eachConcur(console.log),
)
// No output

await consumeConcur(asyncIterable)
//=> sloth
//=> 2
//=> 3
```

## Defined in

[iterate.d.ts:249](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/iterate.d.ts#L249)
