[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / nextAsync

# Function: nextAsync()

> **nextAsync**\<`Value`\>(`asyncIterable`): `Promise`\<[[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>, `AsyncIterable`\<`Value`, `any`, `any`\>]\>

Returns a promise that resolves to a pair of async iterables. If
`asyncIterable` is empty, then both of the returned async iterables are
empty. Otherwise, the first async iterable contains the first value of
`asyncIterable` and the second async iterable contains the rest of the values
of `asyncIterable`. The second async iterable can only be iterated once.

## Type Parameters

• **Value**

## Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

## Returns

`Promise`\<[[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>, `AsyncIterable`\<`Value`, `any`, `any`\>]\>

## Example

```js
const slothActivities = asAsync([`sleeping`, `yawning`, `eating`])
const [first, rest] = await nextAsync(slothActivities)

console.log(await getAsync(first))
//=> sleeping

console.log(await reduceAsync(toArray(), rest))
//=> [ 'yawning', 'eating' ]

const badThingsAboutSloths = emptyAsync
const [first2, rest2] = await nextAsync(badThingsAboutSloths)

console.log(await countAsync(first2))
//=> 0

console.log(await countAsync(rest2))
//=> 0
```

## Defined in

[optional.d.ts:239](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/optional.d.ts#L239)
