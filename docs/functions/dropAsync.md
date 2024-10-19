[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / dropAsync

# Function: dropAsync()

Returns an async iterable containing the values of `asyncIterable` in iteration
order except for the first `count` values.

If the `count` is greater than the number of values in `asyncIterable`, then an
empty async iterable is returned.

## Throws

if `count` isn't a non-negative integer.

## Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, `sloth`]),
    dropAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ 4, 5, 'sloth' ]
```

## dropAsync(count)

> **dropAsync**\<`Count`\>(`count`): \<`Value`\>(`asyncIterable`) =>
> `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in iteration
order except for the first `count` values.

If the `count` is greater than the number of values in `asyncIterable`, then an
empty async iterable is returned.

### Type Parameters

• **Count** _extends_ `number`

### Parameters

• **count**: `NonNegativeInteger`\<`Count`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Throws

if `count` isn't a non-negative integer.

### Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, `sloth`]),
    dropAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ 4, 5, 'sloth' ]
```

### Defined in

[slice.d.ts:198](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/slice.d.ts#L198)

## dropAsync(count, asyncIterable)

> **dropAsync**\<`Count`, `Value`\>(`count`, `asyncIterable`):
> `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in iteration
order except for the first `count` values.

If the `count` is greater than the number of values in `asyncIterable`, then an
empty async iterable is returned.

### Type Parameters

• **Count** _extends_ `number`

• **Value**

### Parameters

• **count**: `NonNegativeInteger`\<`Count`\>

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Throws

if `count` isn't a non-negative integer.

### Example

```js
console.log(
  await pipe(
    asAsync([1, 2, 3, 4, 5, `sloth`]),
    dropAsync(3),
    reduceAsync(toArray()),
  ),
)
//=> [ 4, 5, 'sloth' ]
```

### Defined in

[slice.d.ts:198](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/slice.d.ts#L198)
