[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / maxWith

# Function: maxWith()

Returns an iterable containing a maximum value of `iterable` by comparing the
numerical values of each value, as defined by `fn`, if `iterable` contains at
least one value. Otherwise, returns an empty iterable.

## Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    maxWith(value => value.length),
    get,
  ),
)
//=> sleeping
```

## maxWith(fn, iterable)

> **maxWith**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing a maximum value of `iterable` by comparing the
numerical values of each value, as defined by `fn`, if `iterable` contains at
least one value. Otherwise, returns an empty iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Iterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    maxWith(value => value.length),
    get,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:733](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/statistics.d.ts#L733)

## maxWith(fn)

> **maxWith**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing a maximum value of `iterable` by comparing the
numerical values of each value, as defined by `fn`, if `iterable` contains at
least one value. Otherwise, returns an empty iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

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
    maxWith(value => value.length),
    get,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:733](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/statistics.d.ts#L733)
