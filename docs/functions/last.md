[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / last

# Function: last()

> **last**\<`Value`\>(`iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the last value of `iterable`, or an empty
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
    last,
    reduce(toArray()),
  ),
)
//=> [ 'even more sloth' ]
```

## Defined in

splices.d.ts:400
