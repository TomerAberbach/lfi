[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toArray

# Function: toArray()

> **toArray**\<`Value`\>(): [`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Value`[]\>

Returns a [Reducer](../type-aliases/Reducer.md) that collects values to an `Array`.

## Type Parameters

• **Value**

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Value`[]\>

## Example

```js
console.log(
  pipe(
    cycle([`sloth`, `more sloth`]),
    take(4),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'more sloth', 'sloth', 'more sloth' ]
```

## Defined in

[collect.d.ts:28](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/collect.d.ts#L28)
