[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / sumConcur

# Function: sumConcur()

> **sumConcur**(`concurIterable`): `Promise`\<`number`\>

Returns a promise that resolves to the sum of the numbers of `concurIterable`.

## Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`number`\>

## Returns

`Promise`\<`number`\>

## Example

```js
console.log(await sumConcur(asConcur([1, 4, 6, 2])))
//=> 3
```

## Defined in

[statistics.d.ts:128](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L128)
