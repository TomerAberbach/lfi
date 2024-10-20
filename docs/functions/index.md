[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / index

# Function: index()

> **index**\<`Value`\>(`iterable`): `Iterable`\<[`number`, `Value`], `any`, `any`\>

Returns an iterable equivalent to `iterable` except each value of `iterable`
is placed in an entry containing the value's 0-based index in the iteration
order followed by the value itself.

## Type Parameters

• **Value**

## Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

## Returns

`Iterable`\<[`number`, `Value`], `any`, `any`\>

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    index,
    reduce(toArray()),
  ),
)
//=> [ [ 0, 'sloth' ], [ 1, 'more sloth' ], [ 2, 'even more sloth' ] ]
```

## Defined in

[transform.d.ts:267](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/transform.d.ts#L267)
