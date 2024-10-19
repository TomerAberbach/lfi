[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toCount

# Function: toCount()

> **toCount**(): [`Reducer`](../type-aliases/Reducer.md)\<`unknown`, `number`\>

Returns a [Reducer](../type-aliases/Reducer.md) that counts the number of values
it receives.

Use when composing reducers. Prefer [count](count.md),
[countAsync](countAsync.md), and [countConcur](countConcur.md) for direct use on
iterables.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`unknown`, `number`\>

## Example

```
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toCount(), toMap())),
  ),
)
//=> Map(2) { 5 => 2, 10 => 2 }
```

## Defined in

[statistics.d.ts:27](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L27)
