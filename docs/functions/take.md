[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / take

# Function: take()

Returns an iterable containing the first `count` values of `iterable` in
iteration order.

If the `count` is greater than the number of values in `iterable`, then an
iterable equivalent `iterable` is returned.

## Throws

if `count` isn't a non-negative integer.

## Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, `sloth`],
    take(3),
    reduce(toArray()),
  ),
)
//=> [ 1, 2, 3 ]
```

## take(count)

> **take**\<`Count`\>(`count`): \<`Value`\>(`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the first `count` values of `iterable` in
iteration order.

If the `count` is greater than the number of values in `iterable`, then an
iterable equivalent `iterable` is returned.

### Type Parameters

• **Count** *extends* `number`

### Parameters

• **count**: `NonNegativeInteger`\<`Count`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Throws

if `count` isn't a non-negative integer.

### Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, `sloth`],
    take(3),
    reduce(toArray()),
  ),
)
//=> [ 1, 2, 3 ]
```

### Defined in

[splices.d.ts:245](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L245)

## take(count, iterable)

> **take**\<`Count`, `Value`\>(`count`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing the first `count` values of `iterable` in
iteration order.

If the `count` is greater than the number of values in `iterable`, then an
iterable equivalent `iterable` is returned.

### Type Parameters

• **Count** *extends* `number`

• **Value**

### Parameters

• **count**: `NonNegativeInteger`\<`Count`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Throws

if `count` isn't a non-negative integer.

### Example

```js
console.log(
  pipe(
    [1, 2, 3, 4, 5, `sloth`],
    take(3),
    reduce(toArray()),
  ),
)
//=> [ 1, 2, 3 ]
```

### Defined in

[splices.d.ts:245](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L245)
