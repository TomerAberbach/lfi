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

generators.d.ts:115
