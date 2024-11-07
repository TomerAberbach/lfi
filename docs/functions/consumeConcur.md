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

[side-effects.d.ts:249](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/side-effects.d.ts#L249)
