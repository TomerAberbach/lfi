[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / cacheAsync

# Function: cacheAsync()

> **cacheAsync**\<`Value`\>(`asyncIterable`): `AsyncIterable`\<`Value`, `any`,
> `any`\>

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

[cache.d.ts:47](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/cache.d.ts#L47)
