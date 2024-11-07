[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toWeakMap

# Function: toWeakMap()

> **toWeakMap**\<`Key`, `Value`\>(): [`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`, `Value`, `WeakMap`\<`Key`, `Value`\>\>

Returns a [KeyedReducer](../type-aliases/KeyedReducer.md) that collects key-value pairs to a `WeakMap`.

In the case of pairs with duplicate keys, the value of the last one wins.

## Type Parameters

• **Key** *extends* `object`

• **Value**

## Returns

[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`, `Value`, `WeakMap`\<`Key`, `Value`\>\>

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    map(string => [{ sloth: string }, string.length]),
    reduce(toWeakMap()),
  ),
)
//=> WeakMap { <items unknown> }
```

## Defined in

[collections.d.ts:131](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/collections.d.ts#L131)
