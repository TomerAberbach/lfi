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

[collections.d.ts:28](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/collections.d.ts#L28)
