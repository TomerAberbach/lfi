[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / cycleAsync

# Function: cycleAsync()

> **cycleAsync**\<`Value`\>(`asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an infinite async iterable that repeatedly yields the values of
`asyncIterable`.

## Type Parameters

• **Value**

## Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

## Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(
  await pipe(
    cycleAsync(asAsync([`sloth`, `more sloth`])),
    takeAsync(6),
    joinAsync(`, `),
  ),
)
//=> sloth, more sloth, sloth, more sloth, sloth, more sloth
```

## Defined in

[generate.d.ts:107](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/generate.d.ts#L107)
