[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / getConcur

# Function: getConcur()

> **getConcur**\<`Value`\>(`concurIterable`): `Promise`\<`Value`\>

Returns a promise that resolves to the only value in `concurIterable` if it
contains exactly one value. Otherwise, returns a promise that rejects.

## Type Parameters

• **Value**

## Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Returns

`Promise`\<`Value`\>

## Example

```js
console.log(await getConcur(asConcur([`sloth`])))
//=> sloth

try {
  console.log(await getConcur(emptyConcur))
} catch {
  console.log(`Oh no! It was empty...`)
}
//=> Oh no! It was empty...

try {
  console.log(await getConcur(asConcur([1, `sloth`, 3])))
} catch {
  console.log(`Oh no! It had more than one value...`)
}
//=> Oh no! It had more than one value...
```

## Defined in

[optionals.d.ts:176](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/optionals.d.ts#L176)
