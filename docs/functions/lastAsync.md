[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / lastAsync

# Function: lastAsync()

> **lastAsync**\<`Value`\>(`asyncIterable`): `AsyncIterable`\<`Value`, `any`,
> `any`\>

Returns an async iterable containing the last value of `asyncIterable`, or an
empty async iterable if `asyncIterable` is empty.

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
    lastAsync,
    reduceAsync(toArray()),
  ),
)
//=> [ 'even more sloth' ]
```

## Defined in

[slice.d.ts:417](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/slice.d.ts#L417)