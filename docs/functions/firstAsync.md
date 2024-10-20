[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / firstAsync

# Function: firstAsync()

> **firstAsync**\<`Value`\>(`asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the first value of `asyncIterable`, or
an empty async iterable if `asyncIterable` is empty.

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
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    firstAsync,
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth' ]
```

## Defined in

[slice.d.ts:360](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L360)
