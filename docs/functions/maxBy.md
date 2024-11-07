[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / maxBy

# Function: maxBy()

Returns an iterable containing a maximum value of `iterable` based on the
`fn` [Compare](../type-aliases/Compare.md) function if `iterable` contains at least one value.
Otherwise, returns an empty iterable.

## Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    maxBy((a, b) => a.length - b.length),
    get,
  ),
)
//=> sleeping
```

## maxBy(fn, iterable)

> **maxBy**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing a maximum value of `iterable` based on the
`fn` [Compare](../type-aliases/Compare.md) function if `iterable` contains at least one value.
Otherwise, returns an empty iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`Compare`](../type-aliases/Compare.md)\<`Value`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    maxBy((a, b) => a.length - b.length),
    get,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:393](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L393)

## maxBy(fn)

> **maxBy**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing a maximum value of `iterable` based on the
`fn` [Compare](../type-aliases/Compare.md) function if `iterable` contains at least one value.
Otherwise, returns an empty iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`Compare`](../type-aliases/Compare.md)\<`Value`\>

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
    [`eating`, `sleeping`, `yawning`],
    maxBy((a, b) => a.length - b.length),
    get,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:393](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L393)
