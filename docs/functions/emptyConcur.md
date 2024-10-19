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

[empty.d.ts:46](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/empty.d.ts#L46)
