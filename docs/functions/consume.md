[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / consume

# Function: consume()

> **consume**(`iterable`): `void`

Iterates through `iterable` causing lazy operations to run.

## Parameters

• **iterable**: `Iterable`\<`unknown`, `any`, `any`\>

## Returns

`void`

## Example

```js
const iterable = pipe([`sloth`, 2, 3], each(console.log))
// No output

consume(iterable)
//=> sloth
//=> 2
//=> 3
```

## Defined in

[iterate.d.ts:209](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/iterate.d.ts#L209)
