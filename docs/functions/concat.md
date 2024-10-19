[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / concat

# Function: concat()

> **concat**\<`Value`\>(...`iterables`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable that contains the values of each iterable in `iterables` in
iteration order.

Like `Array.prototype.concat`, but for iterables.

## Type Parameters

• **Value**

## Parameters

• ...**iterables**: readonly `Iterable`\<`Value`, `any`, `any`\>[]

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(pipe(concat([1, 2], [3, `sloth`, 5], [6, 7]), reduce(toArray())))
//=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
```

## Defined in

[collect.d.ts:449](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/collect.d.ts#L449)
