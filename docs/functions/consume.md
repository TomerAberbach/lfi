[**lfi**](../readme.md) • **Docs**

***

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
const iterable = pipe(
  [`sloth`, 2, 3],
  each(console.log),
)
// No output

consume(iterable)
//=> sloth
//=> 2
//=> 3
```

## Defined in

side-effects.d.ts:209
