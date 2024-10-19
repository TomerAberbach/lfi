[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / first

# Function: first()

> **first**\<`Value`\>(`iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the first value of `iterable`, or an empty
iterable if `iterable` is empty.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

## Returns

`Iterable`\<`Value`, `any`, `any`\>

## Example

```
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    first,
    reduce(toArray()),
  ),
)
//=> [ 'sloth' ]
```

## Defined in

[slice.d.ts:341](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/slice.d.ts#L341)
