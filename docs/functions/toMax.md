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

```js
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

[statistics.d.ts:987](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L987)
