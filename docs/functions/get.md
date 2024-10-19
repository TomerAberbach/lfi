[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / get

# Function: get()

> **get**\<`Value`\>(`iterable`): `Value`

Returns the only value in `iterable` if it contains exactly one value.
Otherwise, throws an error.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

## Returns

`Value`

## Example

```js
console.log(get([`sloth`]))
//=> sloth

try {
  console.log(get([]))
} catch {
  console.log(`Oh no! It was empty...`)
}
//=> Oh no! It was empty...

try {
  console.log(get([1, `sloth`, 3]))
} catch {
  console.log(`Oh no! It had more than one value...`)
}
//=> Oh no! It had more than one value...
```

## Defined in

[optional.d.ts:122](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/optional.d.ts#L122)
