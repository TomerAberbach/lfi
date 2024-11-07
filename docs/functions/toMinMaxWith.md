[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMinMaxWith

# Function: toMinMaxWith()

> **toMinMaxWith**\<`Value`\>(`fn`): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

Returns an optional reducer that finds the [MinMax](../type-aliases/MinMax.md) value of the values
it receives by comparing the numerical values of each value, as defined by
`fn`.

Use when composing reducers. Prefer [minMaxWith](minMaxWith.md) for direct use on
iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**

## Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toMinMaxWith(string => string.codePointAt(0)), toMap())),
  ),
)
//=> Map(2) {
//=>   5 => { min: 'sloth', max: 'sloth' },
//=>   10 => { min: 'more sloth', max: 'some sloth' }
//=> }
```

## Defined in

[statistics.d.ts:808](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L808)
