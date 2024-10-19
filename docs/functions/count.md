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

[statistics.d.ts:40](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L40)
