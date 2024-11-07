[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toSet

# Function: toSet()

> **toSet**\<`Value`\>(): [`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Set`\<`Value`\>\>

Returns a [Reducer](../type-aliases/Reducer.md) that collects values to a `Set`.

## Type Parameters

• **Value**

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Set`\<`Value`\>\>

## Example

```js
console.log(
  pipe(
    cycle([`sloth`, `more sloth`]),
    take(4),
    reduce(toArray()),
  ),
)
//=> Set(2) { 'sloth', 'more sloth' }
```

## Defined in

collections.d.ts:45
