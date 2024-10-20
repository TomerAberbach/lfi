[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / indexAsync

# Function: indexAsync()

> **indexAsync**\<`Value`\>(`asyncIterable`): `AsyncIterable`\<[`number`, `Value`], `any`, `any`\>

Returns an async iterable equivalent to `asyncIterable` except each value of
`asyncIterable` is placed in an entry containing the value's 0-based index in
the iteration order followed by the value itself.

## Type Parameters

• **Value**

## Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

## Returns

`AsyncIterable`\<[`number`, `Value`], `any`, `any`\>

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    indexAsync,
    reduceAsync(toArray()),
  ),
)
//=> [ [ 0, 'sloth' ], [ 1, 'more sloth' ], [ 2, 'even more sloth' ] ]
```

## Defined in

[transform.d.ts:288](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/transform.d.ts#L288)
