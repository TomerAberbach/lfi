[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toCount

# Function: toCount()

> **toCount**(): [`Reducer`](../type-aliases/Reducer.md)\<`unknown`, `number`\>

Returns a [Reducer](../type-aliases/Reducer.md) that counts the number of values it receives.

Use when composing reducers. Prefer [count](count.md), [countAsync](countAsync.md), and
[countConcur](countConcur.md) for direct use on iterables.

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

[statistics.d.ts:27](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/statistics.d.ts#L27)
