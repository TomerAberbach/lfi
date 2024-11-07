[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / repeat

# Function: repeat()

> **repeat**\<`Value`\>(`value`): `Iterable`\<`Value`, `any`, `any`\>

Returns an infinite iterable that repeatedly yields `value`.

## Type Parameters

• **Value**

## Parameters

• **value**: `Value`

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(
  pipe(
    repeat(`sloth`),
    take(3),
    join(`, `),
  ),
)
//=> sloth, sloth, sloth
```

## Defined in

[generators.d.ts:115](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/generators.d.ts#L115)
