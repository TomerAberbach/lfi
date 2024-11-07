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

[collections.d.ts:63](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/collections.d.ts#L63)
