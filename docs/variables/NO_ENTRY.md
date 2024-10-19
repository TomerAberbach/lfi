[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / NO_ENTRY

# Variable: NO_ENTRY

> `const` **NO_ENTRY**: unique `symbol`

A unique value representing the lack of an entry for some key in a
[KeyedReducer](../type-aliases/KeyedReducer.md) or
[AsyncKeyedReducer](../type-aliases/AsyncKeyedReducer.md).

Keyed reducers use this instead of `null` or `undefined` because they are valid
values. Furthermore, introducing a `has` method for the purpose of
disambiguation would be less performant due to the need to perform the lookup
twice when the entry exists: `has` followed by `get` for the same key.

## Defined in

[reducer.d.ts:246](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/reducer.d.ts#L246)