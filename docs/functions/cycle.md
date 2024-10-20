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

[generate.d.ts:89](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/generate.d.ts#L89)
