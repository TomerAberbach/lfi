[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / findConcur

# Function: findConcur()

Returns a concur iterable containing the first value of `concurIterable` for
which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
empty concur iterable.

Like `Array.prototype.find`, but for concur iterables.

## Example

```js
const concurIterable = asConcur([1, 2, `sloth`, 4, `other string`])

console.log(
  await pipe(
    concurIterable,
    findConcur(value => typeof value === `string`),
    orConcur(() => `yawn`),
  ),
)
//=> sloth

console.log(
  await pipe(
    concurIterable,
    findConcur(value => Array.isArray(value)),
    orConcur(() => `yawn`),
  ),
)
//=> yawn!
```

## findConcur(fn)

> **findConcur**\<`Value`\>(`fn`): (`concurIterable`) => [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns a concur iterable containing the first value of `concurIterable` for
which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
empty concur iterable.

Like `Array.prototype.find`, but for concur iterables.

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
    findConcur(value => typeof value === `string`),
    orConcur(() => `yawn`),
  ),
)
//=> sloth

console.log(
  await pipe(
    concurIterable,
    findConcur(value => Array.isArray(value)),
    orConcur(() => `yawn`),
  ),
)
//=> yawn!
```

### Defined in

[filters.d.ts:561](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L561)

## findConcur(fn, concurIterable)

> **findConcur**\<`Value`\>(`fn`, `concurIterable`): [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns a concur iterable containing the first value of `concurIterable` for
which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
empty concur iterable.

Like `Array.prototype.find`, but for concur iterables.

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
    findConcur(value => typeof value === `string`),
    orConcur(() => `yawn`),
  ),
)
//=> sloth

console.log(
  await pipe(
    concurIterable,
    findConcur(value => Array.isArray(value)),
    orConcur(() => `yawn`),
  ),
)
//=> yawn!
```

### Defined in

[filters.d.ts:561](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L561)
