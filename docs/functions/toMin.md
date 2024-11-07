[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMin

# Function: toMin()

> **toMin**(): [`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`number`\>

Returns an optional reducer that finds the minimum value of the values it
receives.

Use when composing reducers. Prefer [min](min.md) for direct use on iterables.

## Returns

[`OptionalReducer`](../type-aliases/OptionalReducer.md)\<`number`\>

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string.codePointAt(0)]),
    reduce(toGrouped(toMin(), toMap())),
  ),
)
//=> Map(2) { 5 => 115, 10 => 109 }
```

## Defined in

[statistics.d.ts:925](https://github.com/TomerAberbach/lfi/blob/95b3b82a9fc32cec65089cf86d003d7620dc44fc/src/operations/statistics.d.ts#L925)
