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

[collect.d.ts:131](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/collect.d.ts#L131)
