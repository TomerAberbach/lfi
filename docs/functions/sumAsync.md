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

[statistics.d.ts:116](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L116)
