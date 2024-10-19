[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / uniqueBy

# Function: uniqueBy()

Returns an iterable containing the values of `iterable` in iteration order,
except values for which `fn` returns the same value are deduplicated.

When values are deduplicated, the value earlier in iteration order wins.

## Example

```js
console.log(
  pipe(
    [`sloth`, `sleep`, `fast`, `slow`, `mean`],
    uniqueBy(word => word.length),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'fast' ]
```

## uniqueBy(fn)

> **uniqueBy**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order,
except values for which `fn` returns the same value are deduplicated.

When values are deduplicated, the value earlier in iteration order wins.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `sleep`, `fast`, `slow`, `mean`],
    uniqueBy(word => word.length),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'fast' ]
```

### Defined in

[exclude.d.ts:307](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/exclude.d.ts#L307)

## uniqueBy(fn, iterable)

> **uniqueBy**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the values of `iterable` in iteration order,
except values for which `fn` returns the same value are deduplicated.

When values are deduplicated, the value earlier in iteration order wins.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`sloth`, `sleep`, `fast`, `slow`, `mean`],
    uniqueBy(word => word.length),
    reduce(toArray()),
  ),
)
//=> [ 'sloth', 'fast' ]
```

### Defined in

[exclude.d.ts:310](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/exclude.d.ts#L310)
