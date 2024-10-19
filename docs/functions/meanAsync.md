[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / meanAsync

# Function: meanAsync()

> **meanAsync**(`asyncIterable`): `Promise`\<`number`\>

Returns a promise that resolves to the mean of the numbers of `asyncIterable`.

Returns a promise that resolves to `NaN` for an empty async iterable.

## Parameters

• **asyncIterable**: `AsyncIterable`\<`number`, `any`, `any`\>

## Returns

`Promise`\<`number`\>

## Example

```js
console.log(await meanAsync(asAsync([1, 4, 6, 2])))
//=> 3.25

console.log(await meanAsync(emptyAsync))
//=> NaN
```

## Defined in

[statistics.d.ts:183](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L183)