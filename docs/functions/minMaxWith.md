[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / minMaxWith

# Function: minMaxWith()

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of `iterable` by
comparing the numerical values of each value, as defined by `fn`, if
`iterable` contains at least one value. Otherwise, returns an empty iterable.

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

> **minMaxWith**\<`Value`\>(`fn`, `iterable`): `Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of `iterable` by
comparing the numerical values of each value, as defined by `fn`, if
`iterable` contains at least one value. Otherwise, returns an empty iterable.

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

[statistics.d.ts:830](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/statistics.d.ts#L830)

## minMaxWith(fn)

> **minMaxWith**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<[`MinMax`](../type-aliases/MinMax.md)\<`Value`\>, `any`, `any`\>

Returns an iterable containing a [MinMax](../type-aliases/MinMax.md) value of `iterable` by
comparing the numerical values of each value, as defined by `fn`, if
`iterable` contains at least one value. Otherwise, returns an empty iterable.

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

[statistics.d.ts:834](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/statistics.d.ts#L834)
