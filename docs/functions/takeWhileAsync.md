[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / takeWhileAsync

# Function: takeWhileAsync()

Returns an async iterable containing the values of `asyncIterable` in
iteration order up until but not including the first value for which `fn`
returns a value awaitable to a falsy value.

## Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
    takeWhileAsync(value => value < 5),
    reduceAsync(toArray()),
  ),
)
//=> [ 1, 2, 3, 4 ]
```

## takeWhileAsync(fn)

> **takeWhileAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order up until but not including the first value for which `fn`
returns a value awaitable to a falsy value.

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
    takeWhileAsync(value => value < 5),
    reduceAsync(toArray()),
  ),
)
//=> [ 1, 2, 3, 4 ]
```

### Defined in

splices.d.ts:101

## takeWhileAsync(fn, asyncIterable)

> **takeWhileAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order up until but not including the first value for which `fn`
returns a value awaitable to a falsy value.

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
    takeWhileAsync(value => value < 5),
    reduceAsync(toArray()),
  ),
)
//=> [ 1, 2, 3, 4 ]
```

### Defined in

splices.d.ts:101
