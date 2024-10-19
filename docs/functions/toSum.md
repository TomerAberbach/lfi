[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toSum

# Function: toSum()

> **toSum**(): [`Reducer`](../type-aliases/Reducer.md)\<`number`, `number`\>

Returns a [Reducer](../type-aliases/Reducer.md) that sums the numbers it
receives.

Use when composing reducers. Prefer [sum](sum.md), [sumAsync](sumAsync.md), and
[sumConcur](sumConcur.md) for direct use on iterables.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`number`, `number`\>

## Example

```
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string.length]),
    reduce(toGrouped(toSum(), toMap())),
  ),
)
//=> Map(2) { 5 => 10, 10 => 20 }
```

## Defined in

[statistics.d.ts:94](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L94)
