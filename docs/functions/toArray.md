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

collections.d.ts:28
