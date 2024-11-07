[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / firstAsync

# Function: firstAsync()

> **firstAsync**\<`Value`\>(`asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the first value of `asyncIterable`, or
an empty async iterable if `asyncIterable` is empty.

## Type Parameters

• **Value**

## Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

## Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    firstAsync,
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth' ]
```

## Defined in

[splices.d.ts:360](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L360)
