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

[collect.d.ts:357](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/collect.d.ts#L357)
