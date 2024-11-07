[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / findLastConcur

# Function: findLastConcur()

Returns a concur iterable containing the last value of `concurIterable` for
which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
empty concur iterable.

## Example

```js
const concurIterable = asConcur([1, 2, `sloth`, 4, `other string`])

console.log(
  await pipe(
    concurIterable,
    findLastConcur(value => typeof value === `string`),
    orConcur(() => `yawn!`),
  ),
)
//=> other string

console.log(
  await pipe(
    concurIterable,
    findLastConcur(value => Array.isArray(value)),
    orConcur(() => `yawn!`),
  ),
)
//=> yawn!
```

## findLastConcur(fn)

> **findLastConcur**\<`Value`\>(`fn`): (`concurIterable`) => [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns a concur iterable containing the last value of `concurIterable` for
which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
empty concur iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

### Example

```js
const concurIterable = asConcur([1, 2, `sloth`, 4, `other string`])

console.log(
  await pipe(
    concurIterable,
    findLastConcur(value => typeof value === `string`),
    orConcur(() => `yawn!`),
  ),
)
//=> other string

console.log(
  await pipe(
    concurIterable,
    findLastConcur(value => Array.isArray(value)),
    orConcur(() => `yawn!`),
  ),
)
//=> yawn!
```

### Defined in

filters.d.ts:650

## findLastConcur(fn, concurIterable)

> **findLastConcur**\<`Value`\>(`fn`, `concurIterable`): [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns a concur iterable containing the last value of `concurIterable` for
which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
empty concur iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

### Example

```js
const concurIterable = asConcur([1, 2, `sloth`, 4, `other string`])

console.log(
  await pipe(
    concurIterable,
    findLastConcur(value => typeof value === `string`),
    orConcur(() => `yawn!`),
  ),
)
//=> other string

console.log(
  await pipe(
    concurIterable,
    findLastConcur(value => Array.isArray(value)),
    orConcur(() => `yawn!`),
  ),
)
//=> yawn!
```

### Defined in

filters.d.ts:650
