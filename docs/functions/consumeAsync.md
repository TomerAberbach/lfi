[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / consumeAsync

# Function: consumeAsync()

> **consumeAsync**(`asyncIterable`): `Promise`\<`void`\>

Iterates through `asyncIterable` causing lazy operations to run.

## Parameters

• **asyncIterable**: `AsyncIterable`\<`unknown`, `any`, `any`\>

## Returns

`Promise`\<`void`\>

## Example

```js
const asyncIterable = pipe(asAsync([`sloth`, 2, 3]), eachAsync(console.log))
// No output

await consumeAsync(asyncIterable)
//=> sloth
//=> 2
//=> 3
```

## Defined in

[iterate.d.ts:228](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/iterate.d.ts#L228)
