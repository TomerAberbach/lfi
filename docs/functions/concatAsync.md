[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / concatAsync

# Function: concatAsync()

> **concatAsync**\<`Value`\>(...`iterables`): `AsyncIterable`\<`Value`, `any`,
> `any`\>

Returns an async iterable that contains the values of each iterable in
`iterables` in iteration order.

Like `Array.prototype.concat`, but for async iterables.

## Type Parameters

• **Value**

## Parameters

• ...**iterables**: readonly (`AsyncIterable`\<`Value`, `any`, `any`\> \|
`Iterable`\<`Value`, `any`, `any`\>)[]

## Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(
  await pipe(
    concatAsync(asAsync([1, 2]), [3, `sloth`, 5], asAsync([6, 7])),
    reduceAsync(toArray()),
  ),
)
//=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
```

## Defined in

[collect.d.ts:470](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L470)
