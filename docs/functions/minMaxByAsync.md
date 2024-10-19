[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minMaxByAsync

# Function: minMaxByAsync()

Returns an async iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `asyncIterable` based on the `fn`
[AsyncCompare](../type-aliases/AsyncCompare.md) function if `asyncIterable`
contains at least one value. Otherwise, returns an empty async iterable.

## Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    minMaxByAsync((a, b) => a.length - b.length),
    getAsync,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

## minMaxByAsync(fn, asyncIterable)

> **minMaxByAsync**\<`Value`\>(`fn`, `asyncIterable`):
> `AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`,
> `any`\>

Returns an async iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `asyncIterable` based on the `fn`
[AsyncCompare](../type-aliases/AsyncCompare.md) function if `asyncIterable`
contains at least one value. Otherwise, returns an empty async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`,
`any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    minMaxByAsync((a, b) => a.length - b.length),
    getAsync,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:451](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L451)

## minMaxByAsync(fn)

> **minMaxByAsync**\<`Value`\>(`fn`): (`asyncIterable`) =>
> `AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`,
> `any`\>

Returns an async iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `asyncIterable` based on the `fn`
[AsyncCompare](../type-aliases/AsyncCompare.md) function if `asyncIterable`
contains at least one value. Otherwise, returns an empty async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`,
`any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    minMaxByAsync((a, b) => a.length - b.length),
    getAsync,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:455](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/statistics.d.ts#L455)
