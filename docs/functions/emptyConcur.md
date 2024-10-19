[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / emptyConcur

# Function: emptyConcur()

> **emptyConcur**(`apply`): `Promise`\<`void`\>

A concur iterable that contains zero values.

Can be used as a concur iterable of any type.

Like `[]`, but for concur iterables.

## Parameters

• **apply**:
[`ConcurIterableApply`](../type-aliases/ConcurIterableApply.md)\<`any`\>

## Returns

`Promise`\<`void`\>

## Example

```js
console.log(await pipe(emptyConcur, reduceConcur(toArray())))
//=> []
```

## Defined in

[empty.d.ts:46](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/empty.d.ts#L46)
