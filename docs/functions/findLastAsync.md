[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / findLastAsync

# Function: findLastAsync()

Returns an async iterable containing the last value of `asyncIterable` for which
`fn` returns a value awaitable to a truthy value. Otherwise, returns an empty
async iterable.

## Example

```js
const asyncIterable = asAsync([1, 2, `sloth`, 4, `other string`])

console.log(
  await pipe(
    asyncIterable,
    findLastAsync(value => typeof value === `string`),
    orAsync(() => `yawn!`),
  ),
)
//=> other string

console.log(
  await pipe(
    asyncIterable,
    findLastAsync(value => Array.isArray(value)),
    orAsync(() => `yawn!`),
  ),
)
//=> yawn!
```

## findLastAsync(fn)

> **findLastAsync**\<`Value`\>(`fn`): (`asyncIterable`) =>
> [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

Returns an async iterable containing the last value of `asyncIterable` for which
`fn` returns a value awaitable to a truthy value. Otherwise, returns an empty
async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

### Example

```js
const asyncIterable = asAsync([1, 2, `sloth`, 4, `other string`])

console.log(
  await pipe(
    asyncIterable,
    findLastAsync(value => typeof value === `string`),
    orAsync(() => `yawn!`),
  ),
)
//=> other string

console.log(
  await pipe(
    asyncIterable,
    findLastAsync(value => Array.isArray(value)),
    orAsync(() => `yawn!`),
  ),
)
//=> yawn!
```

### Defined in

[find.d.ts:190](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/find.d.ts#L190)

## findLastAsync(fn, asyncIterable)

> **findLastAsync**\<`Value`\>(`fn`, `asyncIterable`):
> [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

Returns an async iterable containing the last value of `asyncIterable` for which
`fn` returns a value awaitable to a truthy value. Otherwise, returns an empty
async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

[`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

### Example

```js
const asyncIterable = asAsync([1, 2, `sloth`, 4, `other string`])

console.log(
  await pipe(
    asyncIterable,
    findLastAsync(value => typeof value === `string`),
    orAsync(() => `yawn!`),
  ),
)
//=> other string

console.log(
  await pipe(
    asyncIterable,
    findLastAsync(value => Array.isArray(value)),
    orAsync(() => `yawn!`),
  ),
)
//=> yawn!
```

### Defined in

[find.d.ts:190](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/find.d.ts#L190)
