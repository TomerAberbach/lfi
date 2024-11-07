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

[filters.d.ts:308](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L308)

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

[filters.d.ts:311](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L311)
