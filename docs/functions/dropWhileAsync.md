[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / dropWhileAsync

# Function: dropWhileAsync()

Returns an async iterable containing the values of `asyncIterable` in
iteration order starting with the first value for which `fn` returns a value
awaitable to a falsy value.

## Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
    dropWhileAsync(value => value < 5),
    reduceAsync(toArray()),
  ),
)
//=> [ 5, 6, 7, 8, 'sloth' ]
```

## dropWhileAsync(fn)

> **dropWhileAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order starting with the first value for which `fn` returns a value
awaitable to a falsy value.

### Type Parameters

• **Value**

### Parameters

• **fn**

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
    asAsync([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
    dropWhileAsync(value => value < 5),
    reduceAsync(toArray()),
  ),
)
//=> [ 5, 6, 7, 8, 'sloth' ]
```

### Defined in

[slice.d.ts:44](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L44)

## dropWhileAsync(fn, asyncIterable)

> **dropWhileAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order starting with the first value for which `fn` returns a value
awaitable to a falsy value.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
    dropWhileAsync(value => value < 5),
    reduceAsync(toArray()),
  ),
)
//=> [ 5, 6, 7, 8, 'sloth' ]
```

### Defined in

[slice.d.ts:44](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L44)
