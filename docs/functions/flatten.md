[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / flatten

# Function: flatten()

> **flatten**\<`Value`\>(`iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable that contains the values of each iterable in `iterable` in
iteration order.

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
    [
      [1, 2],
      [3, `sloth`, 5],
      [6, 7],
    ],
    flatten,
    reduce(toArray()),
  ),
)
//=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
```

## Defined in

[transform.d.ts:197](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/transform.d.ts#L197)
