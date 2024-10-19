[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / repeat

# Function: repeat()

> **repeat**\<`Value`\>(`value`): `Iterable`\<`Value`, `any`, `any`\>

Returns an infinite iterable that repeatedly yields `value`.

## Type Parameters

• **Value**

## Parameters

• **value**: `Value`

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(pipe(repeat(`sloth`), take(3), join(`, `)))
//=> sloth, sloth, sloth
```

## Defined in

[generate.d.ts:71](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/generate.d.ts#L71)
