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

[generate.d.ts:89](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/generate.d.ts#L89)
