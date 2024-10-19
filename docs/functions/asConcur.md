[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / asConcur

# Function: asConcur()

> **asConcur**\<`Value`\>(`iterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable wrapper around `iterable`.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\> \| `AsyncIterable`\<`Value`,
`any`, `any`\> \|
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

## Example

```js
const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])

await forEachConcur(console.log, concurIterable)
//=> sloth
//=> more sloth
//=> even more sloth
```

## Defined in

[as.d.ts:77](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/as.d.ts#L77)