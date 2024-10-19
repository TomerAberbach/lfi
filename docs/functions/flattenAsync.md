[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / flattenAsync

# Function: flattenAsync()

> **flattenAsync**\<`Value`\>(`asyncIterable`): `AsyncIterable`\<`Value`, `any`,
> `any`\>

Returns an async iterable that contains the values of each iterable in
`asyncIterable` in iteration order.

Like `Array.prototype.flat`, but for async iterables.

## Type Parameters

• **Value**

## Parameters

• **asyncIterable**: `AsyncIterable`\<`Iterable`\<`Value`, `any`, `any`\> \|
`AsyncIterable`\<`Value`, `any`, `any`\>, `any`, `any`\>

## Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(
  await pipe(
    asAsync([asAsync([1, 2]), [3, `sloth`, 5], asAsync([6, 7])]),
    flattenAsync,
    reduceAsync(toArray()),
  ),
)
//=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
```

## Defined in

[transform.d.ts:219](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/transform.d.ts#L219)