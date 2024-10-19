[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / countAsync

# Function: countAsync()

> **countAsync**\<`Value`\>(`asyncIterable`): `Promise`\<`number`\>

Returns a promise that resolves to the number of values in `asyncIterable`.

Like `Array.prototype.length`, but for async iterables.

## Type Parameters

• **Value**

## Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

## Returns

`Promise`\<`number`\>

## Example

```js
console.log(
  await countAsync(asAsync([`sloth`, `more sloth`, `even more sloth`])),
)
//=> 3
```

## Defined in

[statistics.d.ts:55](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L55)
