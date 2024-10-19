[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toMinBy

# Function: toMinBy()

> **toMinBy**\<`Value`\>(`fn`):
> [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`\>

Returns an optional reducer that finds the minimum value of the values it
receives based on the `fn` [Compare](../type-aliases/Compare.md) function.

Use when composing reducers. Prefer [minBy](minBy.md) for direct use on
iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**: [`Compare`](../type-aliases/Compare.md)\<`Value`\>

## Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`\>

## Example

```
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toMinBy((s1, s2) => s1.localeCompare(s2)), toMap())),
  ),
)
//=> Map(2) { 5 => 'sleep', 10 => 'more sloth' }
```

## Defined in

[statistics.d.ts:213](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L213)
