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

[collect.d.ts:28](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/collect.d.ts#L28)
