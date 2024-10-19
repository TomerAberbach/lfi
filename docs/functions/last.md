[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / last

# Function: last()

> **last**\<`Value`\>(`iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the last value of `iterable`, or an empty
iterable if `iterable` is empty.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Example

```
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    last,
    reduce(toArray()),
  ),
)
//=> [ 'even more sloth' ]
```

## Defined in

[slice.d.ts:399](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/slice.d.ts#L399)
