[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toMaxWith

# Function: toMaxWith()

> **toMaxWith**\<`Value`\>(`fn`):
> [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`\>

Returns an optional reducer that finds the maximum value of the values it
receives by comparing the numerical values of each value, as defined by `fn`.

Use when composing reducers. Prefer [maxWith](maxWith.md) for direct use on
iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**

## Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`\>

## Example

```
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toMaxWith(string => string.codePointAt(0)), toMap())),
  ),
)
//=> Map(2) { 5 => 'sloth', 10 => 'some sloth' }
```

## Defined in

[statistics.d.ts:640](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L640)
