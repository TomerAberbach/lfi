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

[reducers.d.ts:248](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/reducers.d.ts#L248)
