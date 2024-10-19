[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / dropConcur

# Function: dropConcur()

Returns a concur iterable containing the values of `concurIterable` in iteration
order except for the first `count` values.

If the `count` is greater than the number of values in `concurIterable`, then an
empty concur iterable is returned.

## Throws

if `count` isn't a non-negative integer.

## Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, `sloth`]),
    dropConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ 4, 5, 'sloth' ]
```

## dropConcur(count)

> **dropConcur**\<`Count`\>(`count`): \<`Value`\>(`concurIterable`) =>
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` in iteration
order except for the first `count` values.

If the `count` is greater than the number of values in `concurIterable`, then an
empty concur iterable is returned.

### Type Parameters

• **Count** _extends_ `number`

### Parameters

• **count**: `NonNegativeInteger`\<`Count`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Throws

if `count` isn't a non-negative integer.

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, `sloth`]),
    dropConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ 4, 5, 'sloth' ]
```

### Defined in

[slice.d.ts:221](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/slice.d.ts#L221)

## dropConcur(count, concurIterable)

> **dropConcur**\<`Count`, `Value`\>(`count`, `concurIterable`):
> [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` in iteration
order except for the first `count` values.

If the `count` is greater than the number of values in `concurIterable`, then an
empty concur iterable is returned.

### Type Parameters

• **Count** _extends_ `number`

• **Value**

### Parameters

• **count**: `NonNegativeInteger`\<`Count`\>

• **concurIterable**:
[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Throws

if `count` isn't a non-negative integer.

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, `sloth`]),
    dropConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ 4, 5, 'sloth' ]
```

### Defined in

[slice.d.ts:221](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/slice.d.ts#L221)