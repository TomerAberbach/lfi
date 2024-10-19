[**lfi**](../readme.md) • **Docs**

---

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

[statistics.d.ts:40](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L40)
