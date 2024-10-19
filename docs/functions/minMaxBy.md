[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minMaxBy

# Function: minMaxBy()

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of
`iterable` based on the `fn` [Compare](../type-aliases/Compare.md) function if
`iterable` contains at least one value. Otherwise, returns an empty iterable.

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

> **minMaxBy**\<`Value`\>(`fn`, `iterable`):
> `Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of
`iterable` based on the `fn` [Compare](../type-aliases/Compare.md) function if
`iterable` contains at least one value. Otherwise, returns an empty iterable.

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

[statistics.d.ts:412](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L412)

## minMaxBy(fn)

> **minMaxBy**\<`Value`\>(`fn`): (`iterable`) =>
> `Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of
`iterable` based on the `fn` [Compare](../type-aliases/Compare.md) function if
`iterable` contains at least one value. Otherwise, returns an empty iterable.

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

[statistics.d.ts:416](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L416)
