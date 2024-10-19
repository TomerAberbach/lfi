[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minMaxWithAsync

# Function: minMaxWithAsync()

Returns an async iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `asyncIterable` by comparing the numerical values of each value, as defined
by `fn`, if `asyncIterable` contains at least one value. Otherwise, returns an
empty async iterable.

## Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    minMaxWithAsync(value => value.length),
    getAsync,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

## minMaxWithAsync(fn, asyncIterable)

> **minMaxWithAsync**\<`Value`\>(`fn`, `asyncIterable`):
> `AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`,
> `any`\>

Returns an async iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `asyncIterable` by comparing the numerical values of each value, as defined
by `fn`, if `asyncIterable` contains at least one value. Otherwise, returns an
empty async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`,
`any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    minMaxWithAsync(value => value.length),
    getAsync,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:796](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L796)

## minMaxWithAsync(fn)

> **minMaxWithAsync**\<`Value`\>(`fn`): (`asyncIterable`) =>
> `AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`,
> `any`\>

Returns an async iterable containing a [MinMax](../type-aliases/MinMax.md) value
of `asyncIterable` by comparing the numerical values of each value, as defined
by `fn`, if `asyncIterable` contains at least one value. Otherwise, returns an
empty async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`,
`any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    minMaxWithAsync(value => value.length),
    getAsync,
  ),
)
//=> { min: 'eating', max: 'sleeping' }
```

### Defined in

[statistics.d.ts:800](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L800)
