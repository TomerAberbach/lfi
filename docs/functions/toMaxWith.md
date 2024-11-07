[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMaxWith

# Function: toMaxWith()

> **toMaxWith**\<`Value`\>(`fn`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`Value`\>

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

```js
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

[statistics.d.ts:714](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L714)
