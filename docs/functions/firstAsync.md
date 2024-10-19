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

```
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

[slice.d.ts:359](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/slice.d.ts#L359)
