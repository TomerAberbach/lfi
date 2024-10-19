[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / concatAsync

# Function: concatAsync()

> **concatAsync**\<`Value`\>(...`iterables`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable that contains the values of each iterable in
`iterables` in iteration order.

Like `Array.prototype.concat`, but for async iterables.

## Type Parameters

• **Value**

## Parameters

• ...**iterables**: readonly (`AsyncIterable`\<`Value`, `any`, `any`\> \| `Iterable`\<`Value`, `any`, `any`\>)[]

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

[collect.d.ts:470](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/collect.d.ts#L470)
