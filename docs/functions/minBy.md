[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minBy

# Function: minBy()

Returns an iterable containing a minimum value of `iterable` based on the `fn`
[Compare](../type-aliases/Compare.md) function if `iterable` contains at least
one value. Otherwise, returns an empty iterable.

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

Returns an iterable containing a minimum value of `iterable` based on the `fn`
[Compare](../type-aliases/Compare.md) function if `iterable` contains at least
one value. Otherwise, returns an empty iterable.

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

[statistics.d.ts:232](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L232)

## minBy(fn)

> **minBy**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`,
> `any`\>

Returns an iterable containing a minimum value of `iterable` based on the `fn`
[Compare](../type-aliases/Compare.md) function if `iterable` contains at least
one value. Otherwise, returns an empty iterable.

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

[statistics.d.ts:232](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L232)
