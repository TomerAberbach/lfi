[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMinMaxBy

# Function: toMinMaxBy()

> **toMinMaxBy**\<`Value`\>(`fn`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

Returns an optional reducer that finds the [MinMax](../type-aliases/MinMax.md) value of the values
it receives based on the `fn` [Compare](../type-aliases/Compare.md) function.

Use when composing reducers. Prefer [minMaxBy](minMaxBy.md) for direct use on
iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**: [`Compare`](../type-aliases/Compare.md)\<`Value`\>

## Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

## Example

```
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toMinMaxBy((s1, s2) => s1.localeCompare(s2)), toMap())),
  ),
)
//=> Map(2) {
//=>   5 => { min: 'sleep', max: 'sloth' },
//=>   10 => { min: 'more sloth', max: 'some sloth' }
//=> }
```

## Defined in

[statistics.d.ts:464](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/statistics.d.ts#L464)
