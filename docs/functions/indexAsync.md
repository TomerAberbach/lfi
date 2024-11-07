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

[transforms.d.ts:288](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/transforms.d.ts#L288)
