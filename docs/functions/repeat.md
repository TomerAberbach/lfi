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

[generate.d.ts:71](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/generate.d.ts#L71)
