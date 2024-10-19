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

[statistics.d.ts:128](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L128)
