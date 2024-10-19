[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minWithAsync

# Function: minWithAsync()

Returns an async iterable containing a minimum value of `asyncIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`asyncIterable` contains at least one value. Otherwise, returns an empty async
iterable.

## Example

```js
console.log(
  await pipe(
    asAsync([`eating`, `sleeping`, `yawning`]),
    minWithAsync(value => value.length),
    getAsync,
  ),
)
//=> eating
```

## minWithAsync(fn, asyncIterable)

> **minWithAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`Value`,
> `any`, `any`\>

Returns an async iterable containing a minimum value of `asyncIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`asyncIterable` contains at least one value. Otherwise, returns an empty async
iterable.

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
    minWithAsync(value => value.length),
    getAsync,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:599](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L599)

## minWithAsync(fn)

> **minWithAsync**\<`Value`\>(`fn`): (`asyncIterable`) =>
> `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable containing a minimum value of `asyncIterable` by
comparing the numerical values of each value, as defined by `fn`, if
`asyncIterable` contains at least one value. Otherwise, returns an empty async
iterable.

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
    minWithAsync(value => value.length),
    getAsync,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:599](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L599)
