[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / dropAsync

# Function: dropAsync()

Returns an async iterable containing the values of `asyncIterable` in
iteration order except for the first `count` values.

If the `count` is greater than the number of values in `asyncIterable`, then
an empty async iterable is returned.

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

> **dropAsync**\<`Count`\>(`count`): \<`Value`\>(`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order except for the first `count` values.

If the `count` is greater than the number of values in `asyncIterable`, then
an empty async iterable is returned.

### Type Parameters

• **Count** *extends* `number`

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

[splices.d.ts:199](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L199)

## dropAsync(count, asyncIterable)

> **dropAsync**\<`Count`, `Value`\>(`count`, `asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable` in
iteration order except for the first `count` values.

If the `count` is greater than the number of values in `asyncIterable`, then
an empty async iterable is returned.

### Type Parameters

• **Count** *extends* `number`

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

[splices.d.ts:199](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L199)
