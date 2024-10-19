[**lfi**](../readme.md) • **Docs**

***

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
const asyncIterable = pipe(
  asAsync([`sloth`, 2, 3]),
  eachAsync(console.log),
)
// No output

await consumeAsync(asyncIterable)
//=> sloth
//=> 2
//=> 3
```

## Defined in

[iterate.d.ts:228](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/iterate.d.ts#L228)
