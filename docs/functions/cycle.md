[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / cycle

# Function: cycle()

> **cycle**\<`Value`\>(`iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an infinite iterable that repeatedly yields the values of `iterable`
in iteration order.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(
  pipe(
    cycle([`sloth`, `more sloth`]),
    take(6),
    join(`, `),
  ),
)
//=> sloth, more sloth, sloth, more sloth, sloth, more sloth
```

## Defined in

[generate.d.ts:89](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/generate.d.ts#L89)
