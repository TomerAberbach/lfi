[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toWeakSet

# Function: toWeakSet()

> **toWeakSet**\<`Value`\>(): [`Reducer`](../type-aliases/Reducer.md)\<`Value`,
> `WeakSet`\<`Value`\>\>

Returns a [Reducer](../type-aliases/Reducer.md) that collects objects to a
`WeakSet`.

## Type Parameters

• **Value** _extends_ `object`

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `WeakSet`\<`Value`\>\>

## Example

```js
console.log(
  pipe(
    cycle([`sloth`, `more sloth`]),
    take(4),
    map(string => ({ sloth: string })),
    reduce(toWeakSet()),
  ),
)
//=> WeakSet { <items unknown> }
```

## Defined in

[collect.d.ts:63](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L63)
