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

[filters.d.ts:366](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L366)

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

[filters.d.ts:369](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L369)
