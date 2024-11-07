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

[transforms.d.ts:197](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/transforms.d.ts#L197)
