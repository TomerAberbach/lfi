[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / maxWithAsync

# Function: maxWithAsync()

Returns an async iterable containing a maximum value of `asyncIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`asyncIterable` contains at least one value. Otherwise, returns an empty
async iterable.

## Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    maxWithAsync(value => value.length),
    getAsync,
  ),
)
//=> sleeping
```

## maxWithAsync(fn, asyncIterable)

> **maxWithAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing a maximum value of `asyncIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`asyncIterable` contains at least one value. Otherwise, returns an empty
async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    maxWithAsync(value => value.length),
    getAsync,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:763](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L763)

## maxWithAsync(fn)

> **maxWithAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing a maximum value of `asyncIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`asyncIterable` contains at least one value. Otherwise, returns an empty
async iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    maxWithAsync(value => value.length),
    getAsync,
  ),
)
//=> sleeping
```

### Defined in

[statistics.d.ts:763](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/statistics.d.ts#L763)
