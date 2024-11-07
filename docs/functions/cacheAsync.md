[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / cacheAsync

# Function: cacheAsync()

> **cacheAsync**\<`Value`\>(`asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable equivalent to `asyncIterable` that iterates over
`asyncIterable` at most once.

## Type Parameters

• **Value**

## Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

## Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

## Example

```js
const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
const asyncIterableWithEffects = eachAsync(console.log, asyncIterable)

const cachedAsyncIterable = cacheAsync(asyncIterableWithEffects)

console.log(await pipe(cachedAsyncIterable, reduceAsync(toArray())))
//=> sloth
//=> more sloth
//=> even more sloth
//=> [ 'sloth', 'more sloth', 'even more sloth' ]

console.log(await pipe(cachedAsyncIterable, reduceAsync(toArray())))
//=> [ 'sloth', 'more sloth', 'even more sloth' ]
```

## Defined in

[side-effects.d.ts:297](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/side-effects.d.ts#L297)
