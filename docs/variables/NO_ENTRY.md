[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / NO\_ENTRY

# Variable: NO\_ENTRY

> `const` **NO\_ENTRY**: unique `symbol`

A unique value representing the lack of an entry for some key in a
[KeyedReducer](../type-aliases/KeyedReducer.md) or [AsyncKeyedReducer](../type-aliases/AsyncKeyedReducer.md).

Keyed reducers use this instead of `null` or `undefined` because they are
valid values. Furthermore, introducing a `has` method for the purpose of
disambiguation would be less performant due to the need to perform the lookup
twice when the entry exists: `has` followed by `get` for the same key.

## Defined in

reducers.d.ts:248
