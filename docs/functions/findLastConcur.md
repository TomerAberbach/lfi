[**lfi**](../readme.md) • **Docs**

---

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

> **findLastConcur**\<`Value`\>(`fn`): (`concurIterable`) =>
> [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

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

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

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

[find.d.ts:220](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/find.d.ts#L220)

## findLastConcur(fn, concurIterable)

> **findLastConcur**\<`Value`\>(`fn`, `concurIterable`):
> [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns a concur iterable containing the last value of `concurIterable` for
which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
empty concur iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

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

[find.d.ts:220](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/find.d.ts#L220)
