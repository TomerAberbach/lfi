[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / getConcur

# Function: getConcur()

> **getConcur**\<`Value`\>(`concurIterable`): `Promise`\<`Value`\>

Returns a promise that resolves to the only value in `concurIterable` if it
contains exactly one value. Otherwise, returns a promise that rejects.

## Type Parameters

• **Value**

## Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

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

[optional.d.ts:176](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/optional.d.ts#L176)
