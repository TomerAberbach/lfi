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

[generators.d.ts:133](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/generators.d.ts#L133)
