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

side-effects.d.ts:228
