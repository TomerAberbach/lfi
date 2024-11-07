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

side-effects.d.ts:249
