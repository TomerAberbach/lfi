[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMinWith

# Function: toMinWith()

> **toMinWith**\<`Value`\>(`fn`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`\>

Returns an optional reducer that finds the minimum value of the values it
receives by comparing the numerical values of each value, as defined by `fn`.

Use when composing reducers. Prefer [minWith](minWith.md) for direct use on
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
    reduce(toGrouped(toMinWith(string => string.codePointAt(0)), toMap())),
  ),
)
//=> Map(2) { 5 => 'sloth', 10 => 'more sloth' }
```

## Defined in

[statistics.d.ts:624](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/statistics.d.ts#L624)
