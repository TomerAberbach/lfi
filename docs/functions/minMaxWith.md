[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minMaxWith

# Function: minMaxWith()

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of
`iterable` by comparing the numerical values of each value, as defined by `fn`,
if `iterable` contains at least one value. Otherwise, returns an empty iterable.

## Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    minMaxWith(value => value.length),
    get,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

## minMaxWith(fn, iterable)

> **minMaxWith**\<`Value`\>(`fn`, `iterable`):
> `Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of
`iterable` by comparing the numerical values of each value, as defined by `fn`,
if `iterable` contains at least one value. Otherwise, returns an empty iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    minMaxWith(value => value.length),
    get,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:756](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L756)

## minMaxWith(fn)

> **minMaxWith**\<`Value`\>(`fn`): (`iterable`) =>
> `Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of
`iterable` by comparing the numerical values of each value, as defined by `fn`,
if `iterable` contains at least one value. Otherwise, returns an empty iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

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
    minMaxWith(value => value.length),
    get,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:760](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L760)
