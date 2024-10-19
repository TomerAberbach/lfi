[**lfi**](../readme.md) • **Docs**

***

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
console.log(
  pipe(
    [`sloth`, `not sloth`, `sloth`],
    unique,
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'not sloth' ]
```

## Defined in

[exclude.d.ts:390](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/exclude.d.ts#L390)
