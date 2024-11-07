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

[splices.d.ts:1082](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L1082)
