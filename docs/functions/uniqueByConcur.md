[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / uniqueByConcur

# Function: uniqueByConcur()

Returns a concur iterable containing the values of `concurIterable`, except
values for which `fn` returns a value awaitable to the same value are
deduplicated.

When values are deduplicated, the value earlier in iteration order wins.

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    uniqueByConcur(word => word.length),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'fast' ]
```

## uniqueByConcur(fn)

> **uniqueByConcur**\<`Value`\>(`fn`): (`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable`, except
values for which `fn` returns a value awaitable to the same value are
deduplicated.

When values are deduplicated, the value earlier in iteration order wins.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    uniqueByConcur(word => word.length),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'fast' ]
```

### Defined in

[exclude.d.ts:365](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/exclude.d.ts#L365)

## uniqueByConcur(fn, concurIterable)

> **uniqueByConcur**\<`Value`\>(`fn`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable`, except
values for which `fn` returns a value awaitable to the same value are
deduplicated.

When values are deduplicated, the value earlier in iteration order wins.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    uniqueByConcur(word => word.length),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'fast' ]
```

### Defined in

[exclude.d.ts:368](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/exclude.d.ts#L368)
