[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toMean

# Function: toMean()

> **toMean**(): [`Reducer`](../type-aliases/Reducer.md)\<`number`, `number`\>

Returns a [Reducer](../type-aliases/Reducer.md) that computes the mean of the
numbers it receives.

Use when composing reducers. Prefer [mean](mean.md), [meanAsync](meanAsync.md),
and [meanConcur](meanConcur.md) for direct use on iterables.

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`number`, `number`\>

## Example

```
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, [...string].filter(c => c === `o`).length]),
    reduce(toGrouped(toMean(), toMap())),
  ),
)
//=> Map(2) { 5 => 0.5, 10 => 2 }
```

## Defined in

[statistics.d.ts:150](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/statistics.d.ts#L150)