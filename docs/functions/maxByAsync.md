[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / maxByAsync

# Function: maxByAsync()

Returns an async iterable containing a maximum value of `asyncIterable` based
on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if `asyncIterable` contains at
least one value. Otherwise, returns an empty async iterable.

## Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    maxByAsync((a, b) => a.length - b.length),
    getAsync,
  ),
)
//=> sleeping
```

## maxByAsync(fn, asyncIterable)

> **maxByAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing a maximum value of `asyncIterable` based
on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if `asyncIterable` contains at
least one value. Otherwise, returns an empty async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    maxByAsync((a, b) => a.length - b.length),
    getAsync,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:421](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L421)

## maxByAsync(fn)

> **maxByAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing a maximum value of `asyncIterable` based
on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if `asyncIterable` contains at
least one value. Otherwise, returns an empty async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`AsyncCompare`](../type-aliases/AsyncCompare.md)\<`Value`\>

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    maxByAsync((a, b) => a.length - b.length),
    getAsync,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:421](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L421)
