[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minMaxAsync

# Function: minMaxAsync()

> **minMaxAsync**(`asyncIterable`):
> `AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`number`\>, `any`,
> `any`\>

Returns an async iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `asyncIterable` if `asyncIterable` contains at least one value. Otherwise,
returns an empty async iterable.

## Parameters

• **asyncIterable**: `AsyncIterable`\<`number`, `any`, `any`\>

## Returns

`AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`number`\>, `any`,
`any`\>

## Example

```js
console.log(await pipe(asAsync([4, 1, 5, -3]), minMaxAsync, getAsync))
//=> { min: -3, max: 5 }
```

## Defined in

[statistics.d.ts:1001](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L1001)
