[**lfi**](../readme.md) • **Docs**

---

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

[statistics.d.ts:116](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L116)
