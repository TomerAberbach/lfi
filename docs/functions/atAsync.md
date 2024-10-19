[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / atAsync

# Function: atAsync()

Returns an async iterable containing the value at the given `index` of
`asyncIterable` or an empty async iterable if `index` is out of bounds.

WARNING: This function linearly iterates up to `index` because async
iterables do not support random access.

## Throws

if `index` is not a non-negative integer.

## Example

```js
const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    asyncIterable,
    atAsync(1),
    getAsync,
  ),
)
//=> 'more sloth'
```

## atAsync(index)

> **atAsync**\<`Index`\>(`index`): \<`Value`\>(`asyncIterable`) => [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

Returns an async iterable containing the value at the given `index` of
`asyncIterable` or an empty async iterable if `index` is out of bounds.

WARNING: This function linearly iterates up to `index` because async
iterables do not support random access.

### Type Parameters

• **Index** *extends* `number`

### Parameters

• **index**: `NonNegativeInteger`\<`Index`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

### Throws

if `index` is not a non-negative integer.

### Example

```js
const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    asyncIterable,
    atAsync(1),
    getAsync,
  ),
)
//=> 'more sloth'
```

### Defined in

[slice.d.ts:739](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L739)

## atAsync(index, asyncIterable)

> **atAsync**\<`Index`, `Value`\>(`index`, `asyncIterable`): [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

Returns an async iterable containing the value at the given `index` of
`asyncIterable` or an empty async iterable if `index` is out of bounds.

WARNING: This function linearly iterates up to `index` because async
iterables do not support random access.

### Type Parameters

• **Index** *extends* `number`

• **Value**

### Parameters

• **index**: `NonNegativeInteger`\<`Index`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

### Throws

if `index` is not a non-negative integer.

### Example

```js
const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    asyncIterable,
    atAsync(1),
    getAsync,
  ),
)
//=> 'more sloth'
```

### Defined in

[slice.d.ts:742](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L742)
