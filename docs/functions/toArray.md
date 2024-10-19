[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / toArray

# Function: toArray()

> **toArray**\<`Value`\>(): [`Reducer`](../type-aliases/Reducer.md)\<`Value`,
> `Value`[]\>

Returns a [Reducer](../type-aliases/Reducer.md) that collects values to an
`Array`.

## Type Parameters

• **Value**

## Returns

[`Reducer`](../type-aliases/Reducer.md)\<`Value`, `Value`[]\>

## Example

```js
console.log(pipe(cycle([`sloth`, `more sloth`]), take(4), reduce(toArray())))
//=> [ 'sloth', 'more sloth', 'sloth', 'more sloth' ]
```

## Defined in

[collect.d.ts:28](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/collect.d.ts#L28)
