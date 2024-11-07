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

```js
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

splices.d.ts:342
