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

```js
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

[statistics.d.ts:27](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L27)
