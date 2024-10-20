[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / minMaxBy

# Function: minMaxBy()

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of `iterable` based on
the `fn` [Compare](../type-aliases/Compare.md) function if `iterable` contains at least one value.
Otherwise, returns an empty iterable.

## Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    minMaxBy((a, b) => a.length - b.length),
    get,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

## minMaxBy(fn, iterable)

> **minMaxBy**\<`Value`\>(`fn`, `iterable`): `Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of `iterable` based on
the `fn` [Compare](../type-aliases/Compare.md) function if `iterable` contains at least one value.
Otherwise, returns an empty iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**: [`Compare`](../type-aliases/Compare.md)\<`Value`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    minMaxBy((a, b) => a.length - b.length),
    get,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:486](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L486)

## minMaxBy(fn)

> **minMaxBy**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of `iterable` based on
the `fn` [Compare](../type-aliases/Compare.md) function if `iterable` contains at least one value.
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

`Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    minMaxBy((a, b) => a.length - b.length),
    get,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:490](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/statistics.d.ts#L490)
