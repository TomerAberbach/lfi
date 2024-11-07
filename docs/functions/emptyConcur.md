[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / emptyConcur

# Function: emptyConcur()

> **emptyConcur**(`apply`): `Promise`\<`void`\>

A concur iterable that contains zero values.

Can be used as a concur iterable of any type.

Like `[]`, but for concur iterables.

## Parameters

• **apply**: [`ConcurIterableApply`](../type-aliases/ConcurIterableApply.md)\<`any`\>

## Returns

`Promise`\<`void`\>

## Example

```js
console.log(await pipe(emptyConcur, reduceConcur(toArray())))
//=> []
```

## Defined in

[core.d.ts:340](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L340)
