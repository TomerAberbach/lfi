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

generators.d.ts:151
