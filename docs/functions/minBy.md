[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / minBy

# Function: minBy()

Returns an iterable containing a minimum value of `iterable` based on the
`fn` [Compare](../type-aliases/Compare.md) function if `iterable` contains at least one value.
Otherwise, returns an empty iterable.

## Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    minBy((a, b) => a.length - b.length),
    get,
  ),
)
//=> eating
```

## minBy(fn, iterable)

> **minBy**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing a minimum value of `iterable` based on the
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
    minBy((a, b) => a.length - b.length),
    get,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:306](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L306)

## minBy(fn)

> **minBy**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing a minimum value of `iterable` based on the
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
    minBy((a, b) => a.length - b.length),
    get,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:306](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L306)
