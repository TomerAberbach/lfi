[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / minByAsync

# Function: minByAsync()

Returns an async iterable containing a minimum value of `asyncIterable` based
on the `fn` [AsyncCompare](../type-aliases/AsyncCompare.md) function if `asyncIterable` contains at
least one value. Otherwise, returns an empty async iterable.

## Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    minByAsync((a, b) => a.length - b.length),
    getAsync,
  ),
)
//=> eating
```

## minByAsync(fn, asyncIterable)

> **minByAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing a minimum value of `asyncIterable` based
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
    minByAsync((a, b) => a.length - b.length),
    getAsync,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:334](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/statistics.d.ts#L334)

## minByAsync(fn)

> **minByAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing a minimum value of `asyncIterable` based
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
    minByAsync((a, b) => a.length - b.length),
    getAsync,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:334](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/statistics.d.ts#L334)
