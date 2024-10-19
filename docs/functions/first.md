[**lfi**](../readme.md) • **Docs**

***

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

[slice.d.ts:341](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/slice.d.ts#L341)
