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

[iterate.d.ts:249](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/iterate.d.ts#L249)
