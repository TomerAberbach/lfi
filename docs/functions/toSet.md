[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toSet

# Function: toSet()

> **toSet**\<`Value`\>(): [`Reducer`](../type-aliases/Reducer.md)\<`Value`,
> `Set`\<`Value`\>\>

Returns a [Reducer](../type-aliases/Reducer.md) that collects values to a `Set`.

## Type Parameters

• **Value**

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Set`\<`Value`\>\>

## Example

```js
console.log(pipe(cycle([`sloth`, `more sloth`]), take(4), reduce(toArray())))
//=> Set(2) { 'sloth', 'more sloth' }
```

## Defined in

[collect.d.ts:45](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/collect.d.ts#L45)
