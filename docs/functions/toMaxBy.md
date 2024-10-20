[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMaxBy

# Function: toMaxBy()

> **toMaxBy**\<`Value`\>(`fn`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`\>

Returns an optional reducer that finds the maximum value of the values it
receives based on the `fn` [Compare](../type-aliases/Compare.md) function.

Use when composing reducers. Prefer [maxBy](maxBy.md) for direct use on
iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**: [`Compare`](../type-aliases/Compare.md)\<`Value`\>

## Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`\>

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toMaxBy((s1, s2) => s1.localeCompare(s2)), toMap())),
  ),
)
//=> Map(2) { 5 => 'sloth', 10 => 'some sloth' }
```

## Defined in

[statistics.d.ts:374](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L374)
