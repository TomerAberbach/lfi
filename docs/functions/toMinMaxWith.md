[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toMinMaxWith

# Function: toMinMaxWith()

> **toMinMaxWith**\<`Value`\>(`fn`):
> [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

Returns an optional reducer that finds the [MinMax](../type-aliases/MinMax.md)
value of the values it receives by comparing the numerical values of each value,
as defined by `fn`.

Use when composing reducers. Prefer [minMaxWith](minMaxWith.md) for direct use
on iterables.

## Type Parameters

• **Value**

## Parameters

• **fn**

## Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>\>

## Example

```
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

[statistics.d.ts:734](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L734)
