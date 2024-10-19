[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / sumAsync

# Function: sumAsync()

> **sumAsync**(`asyncIterable`): `Promise`\<`number`\>

Returns a promise that resolves to the sum of the numbers of `asyncIterable`.

## Parameters

• **asyncIterable**: `AsyncIterable`\<`number`, `any`, `any`\>

## Returns

`Promise`\<`number`\>

## Example

```js
console.log(await sumAsync(asAsync([1, 4, 6, 2])))
//=> 3
```

## Defined in

[statistics.d.ts:116](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/statistics.d.ts#L116)
