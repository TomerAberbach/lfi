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

[optionals.d.ts:122](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/optionals.d.ts#L122)
