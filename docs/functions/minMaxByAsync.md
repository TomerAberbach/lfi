[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / minMaxByAsync

# Function: minMaxByAsync()

Returns an async iterable containing a [MinMax](../type-aliases/MinMax.md) value of
`asyncIterable` based on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if
`asyncIterable` contains at least one value. Otherwise, returns an empty
async iterable.

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

> **minMaxByAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

Returns an async iterable containing a [MinMax](../type-aliases/MinMax.md) value of
`asyncIterable` based on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if
`asyncIterable` contains at least one value. Otherwise, returns an empty
async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

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

[statistics.d.ts:525](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L525)

## minMaxByAsync(fn)

> **minMaxByAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

Returns an async iterable containing a [MinMax](../type-aliases/MinMax.md) value of
`asyncIterable` based on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if
`asyncIterable` contains at least one value. Otherwise, returns an empty
async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

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

[statistics.d.ts:529](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L529)
