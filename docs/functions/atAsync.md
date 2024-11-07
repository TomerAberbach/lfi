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

[splices.d.ts:739](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L739)

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

[splices.d.ts:742](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L742)
