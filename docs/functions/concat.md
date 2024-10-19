[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / concat

# Function: concat()

> **concat**\<`Value`\>(...`iterables`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable that contains the values of each iterable in `iterables`
in iteration order.

Like `Array.prototype.concat`, but for iterables.

## Type Parameters

• **Value**

## Parameters

• ...**iterables**: readonly `Iterable`\<`Value`, `any`, `any`\>[]

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(
  pipe(
    concat([1, 2], [3, `sloth`, 5], [6, 7]),
    reduce(toArray()),
  ),
)
//=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
```

## Defined in

[collect.d.ts:449](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/collect.d.ts#L449)
