[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMax

# Function: toMax()

> **toMax**(): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`number`\>

Returns an optional reducer that finds the maximum value of the values it
receives.

Use when composing reducers. Prefer [max](max.md) for direct use on iterables.

## Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`number`\>

## Example

```
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string.codePointAt(0)]),
    reduce(toGrouped(toMax(), toMap())),
  ),
)
//=> Map(2) { 5 => 115, 10 => 115 }
```

## Defined in

[statistics.d.ts:987](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/statistics.d.ts#L987)
