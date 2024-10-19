[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / findAsync

# Function: findAsync()

Returns an async iterable containing the first value of `asyncIterable` for
which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
empty async iterable.

Like `Array.prototype.find`, but for async iterables.

## Example

```js
const asyncIterable = asAsync([1, 2, `sloth`, 4, `other string`])

console.log(
  await pipe(
    asyncIterable,
    findAsync(value => typeof value === `string`),
    orAsync(() => `yawn!`),
  ),
)
//=> sloth

console.log(
  await pipe(
    asyncIterable,
    findAsync(value => Array.isArray(value)),
    orAsync(() => `yawn!`),
  ),
)
//=> yawn!
```

## findAsync(fn)

> **findAsync**\<`Value`\>(`fn`): (`asyncIterable`) =>
> [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

Returns an async iterable containing the first value of `asyncIterable` for
which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
empty async iterable.

Like `Array.prototype.find`, but for async iterables.

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
    findAsync(value => typeof value === `string`),
    orAsync(() => `yawn!`),
  ),
)
//=> sloth

console.log(
  await pipe(
    asyncIterable,
    findAsync(value => Array.isArray(value)),
    orAsync(() => `yawn!`),
  ),
)
//=> yawn!
```

### Defined in

[find.d.ts:99](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/find.d.ts#L99)

## findAsync(fn, asyncIterable)

> **findAsync**\<`Value`\>(`fn`, `asyncIterable`):
> [`AsyncOptional`](../type-aliases/AsyncOptional.md)\<`Value`\>

Returns an async iterable containing the first value of `asyncIterable` for
which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
empty async iterable.

Like `Array.prototype.find`, but for async iterables.

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
    findAsync(value => typeof value === `string`),
    orAsync(() => `yawn!`),
  ),
)
//=> sloth

console.log(
  await pipe(
    asyncIterable,
    findAsync(value => Array.isArray(value)),
    orAsync(() => `yawn!`),
  ),
)
//=> yawn!
```

### Defined in

[find.d.ts:99](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/find.d.ts#L99)
