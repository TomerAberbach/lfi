[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / unique

# Function: unique()

> **unique**\<`Value`\>(`iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order,
except values are deduplicated if they are equal using `Object.is`.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(pipe([`sloth`, `not sloth`, `sloth`], unique, reduce(toArray())))
//=> [ 'sloth', 'not sloth' ]
```

## Defined in

[exclude.d.ts:390](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/exclude.d.ts#L390)
