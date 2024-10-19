[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / toWeakSet

# Function: toWeakSet()

> **toWeakSet**\<`Value`\>(): [`Reducer`](../type-aliases/Reducer.md)\<`Value`, `WeakSet`\<`Value`\>\>

Returns a [Reducer](../type-aliases/Reducer.md) that collects objects to a `WeakSet`.

## Type Parameters

• **Value** *extends* `object`

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

[collect.d.ts:63](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/collect.d.ts#L63)
