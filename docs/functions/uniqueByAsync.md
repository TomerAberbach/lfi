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

[filters.d.ts:337](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L337)

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

[filters.d.ts:340](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L340)
