[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toObject

# Function: toObject()

> **toObject**\<`Key`, `Value`\>(): [`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`, `Value`, `Record`\<`Key`, `Value`\>\>

Returns a [KeyedReducer](../type-aliases/KeyedReducer.md) that collects key-value pairs to an object.

In the case of pairs with duplicate keys, the value of the last one wins.

## Type Parameters

• **Key** *extends* `string` \| `number` \| `symbol`

• **Value**

## Returns

[`RawKeyedReducer`](../type-aliases/RawKeyedReducer.md)\<`Key`, `Value`, `Record`\<`Key`, `Value`\>\>

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    map(string => [string, string.length]),
    reduce(toObject()),
  ),
)
//=> { sloth: 5, 'more sloth': 10, 'even more sloth': 15 }
```

## Defined in

[collect.d.ts:85](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/collect.d.ts#L85)
