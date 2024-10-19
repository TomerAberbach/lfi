[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / uniqueByAsync

# Function: uniqueByAsync()

Returns an async iterable containing the values of `asyncIterable` in
iteration order, except values for which `fn` returns a value awaitable to
the same value are deduplicated.

When values are deduplicated, the value earlier in iteration order wins.

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    uniqueByAsync(word => word.length),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'fast' ]
```

## uniqueByAsync(fn)

> **uniqueByAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order, except values for which `fn` returns a value awaitable to
the same value are deduplicated.

When values are deduplicated, the value earlier in iteration order wins.

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
    asAsync([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    uniqueByAsync(word => word.length),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'fast' ]
```

### Defined in

[exclude.d.ts:336](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/exclude.d.ts#L336)

## uniqueByAsync(fn, asyncIterable)

> **uniqueByAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order, except values for which `fn` returns a value awaitable to
the same value are deduplicated.

When values are deduplicated, the value earlier in iteration order wins.

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
    asAsync([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    uniqueByAsync(word => word.length),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 'fast' ]
```

### Defined in

[exclude.d.ts:339](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/exclude.d.ts#L339)
