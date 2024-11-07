[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toJoin

# Function: toJoin()

> **toJoin**(`separator`): [`Reducer`](../type-aliases/Reducer.md)\<`unknown`, `unknown`, `string`\>

Returns a [Reducer](../type-aliases/Reducer.md) that concatenates values to a string where values
are separated by `separator`.

Joins like `Array.prototype.join`, but does not treat `null`, `undefined`,
or `[]` specially.

Use when composing reducers. Prefer [join](join.md), [joinAsync](joinAsync.md), and
[joinConcur](joinConcur.md) for direct use on iterables.

## Parameters

• **separator**: `string`

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`unknown`, `unknown`, `string`\>

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `sleep`, `some sloth`],
    map(string => [string.length, string]),
    reduce(toGrouped(toJoin(`,`), toMap())),
  ),
)
//=> Map(2) { 5 => 'sloth,sleep', 10 => 'more sloth,some sloth' }
```

## Defined in

[collections.d.ts:357](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/collections.d.ts#L357)
