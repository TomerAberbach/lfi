[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toMinMax

# Function: toMinMax()

> **toMinMax**():
> [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`number`\>\>

Returns an optional reducer that finds the [MinMax](../type-aliases/MinMax.md)
value of the values it receives.

Use when composing reducers. Prefer [minMax](minMax.md) for direct use on
iterables.

## Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`number`\>\>

## Example

```
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string.codePointAt(0)]),
    reduce(toGrouped(toMinMax(), toMap())),
  ),
)
//=> Map(2) { 5 => { min: 115, max: 115 }, 10 => { min: 109, max: 115 } }
```

## Defined in

[statistics.d.ts:1050](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L1050)