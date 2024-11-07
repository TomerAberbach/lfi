[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toMap

# Function: toMap()

> **toMap**\<`Key`, `Value`\>(): [`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`, `Value`, `Map`\<`Key`, `Value`\>\>

Returns a [KeyedReducer](../type-aliases/KeyedReducer.md) that collects key-value pairs to a `Map`.

In the case of pairs with duplicate keys, the value of the last one wins.

## Type Parameters

• **Key**

• **Value**

## Returns

[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`, `Value`, `Map`\<`Key`, `Value`\>\>

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    map(string => [string, string.length]),
    reduce(toMap()),
  ),
)
//=> Map(3) { 'sloth' => 5, 'more sloth' => 10, 'even more sloth' => 15 }
```

## Defined in

[collections.d.ts:108](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/collections.d.ts#L108)
