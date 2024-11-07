[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / uniqueAsync

# Function: uniqueAsync()

> **uniqueAsync**\<`Value`\>(`asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order, except values are deduplicated if they are equal using
`Object.is`.

## Type Parameters

• **Value**

## Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

## Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `not sloth`, `sloth`]),
    uniqueAsync,
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'not sloth' ]
```

## Defined in

filters.d.ts:410
