[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toWeakMap

# Function: toWeakMap()

> **toWeakMap**\<`Key`, `Value`\>():
> [`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`, `Value`,
> `WeakMap`\<`Key`, `Value`\>\>

Returns a [KeyedReducer](../type-aliases/KeyedReducer.md) that collects
key-value pairs to a `WeakMap`.

In the case of pairs with duplicate keys, the value of the last one wins.

## Type Parameters

• **Key** _extends_ `object`

• **Value**

## Returns

[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`, `Value`,
`WeakMap`\<`Key`, `Value`\>\>

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

[collect.d.ts:131](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L131)
