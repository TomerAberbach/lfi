[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / count

# Function: count()

> **count**\<`Value`\>(`iterable`): `number`

Returns the number of values in `iterable`.

Like `Array.prototype.length`, but for iterables.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

## Returns

`number`

## Example

```js
console.log(count([`sloth`, `more sloth`, `even more sloth`]))
//=> 3
```

## Defined in

[statistics.d.ts:40](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L40)
