[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toJoin

# Function: toJoin()

> **toJoin**(`separator`): [`Reducer`](../type-aliases/Reducer.md)\<`unknown`,
> `unknown`, `string`\>

Returns a [Reducer](../type-aliases/Reducer.md) that concatenates values to a
string where values are separated by `separator`.

Joins like `Array.prototype.join`, but does not treat `null`, `undefined`, or
`[]` specially.

Use when composing reducers. Prefer [join](join.md), [joinAsync](joinAsync.md),
and [joinConcur](joinConcur.md) for direct use on iterables.

## Parameters

• **separator**: `string`

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`unknown`, `unknown`, `string`\>

## Example

```
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

[collect.d.ts:357](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L357)
