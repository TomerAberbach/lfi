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

[generate.d.ts:107](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/generate.d.ts#L107)
