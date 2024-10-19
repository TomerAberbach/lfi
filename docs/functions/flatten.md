[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / flatten

# Function: flatten()

> **flatten**\<`Value`\>(`iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable that contains the values of each iterable in `iterable`
in iteration order.

Like `Array.prototype.flat`, but for iterables.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Iterable`\<`Value`, `any`, `any`\>, `any`, `any`\>

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(
  pipe(
    [[1, 2], [3, `sloth`, 5], [6, 7]],
    flatten,
    reduce(toArray()),
  ),
)
//=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
```

## Defined in

[transform.d.ts:197](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/transform.d.ts#L197)
