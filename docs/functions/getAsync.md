[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / getAsync

# Function: getAsync()

> **getAsync**\<`Value`\>(`asyncIterable`): `Promise`\<`Value`\>

Returns a promise that resolves to the only value in `asyncIterable` if it
contains exactly one value. Otherwise, returns a promise that rejects.

## Type Parameters

• **Value**

## Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

## Returns

`Promise`\<`Value`\>

## Example

```js
console.log(await getAsync(asAsync([`sloth`])))
//=> sloth

try {
  console.log(await getAsync(emptyAsync))
} catch {
  console.log(`Oh no! It was empty...`)
}
//=> Oh no! It was empty...

try {
  console.log(await getAsync(asAsync([1, `sloth`, 3])))
} catch {
  console.log(`Oh no! It had more than one value...`)
}
//=> Oh no! It had more than one value...
```

## Defined in

[optional.d.ts:148](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/optional.d.ts#L148)
