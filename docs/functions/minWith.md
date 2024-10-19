[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / minWith

# Function: minWith()

Returns an iterable containing a minimum value of `iterable` by comparing the
numerical values of each value, as defined by `fn`, if `iterable` contains at
least one value. Otherwise, returns an empty iterable.

## Example

```js
console.log(
  pipe(
    [`eating`, `sleeping`, `yawning`],
    minWith(value => value.length),
    get,
  ),
)
//=> eating
```

## minWith(fn, iterable)

> **minWith**\<`Value`\>(`fn`, `iterable`): `Iterable`\<`Value`, `any`, `any`\>

Returns an iterable containing a minimum value of `iterable` by comparing the
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
    minWith(value => value.length),
    get,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:569](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L569)

## minWith(fn)

> **minWith**\<`Value`\>(`fn`): (`iterable`) => `Iterable`\<`Value`, `any`,
> `any`\>

Returns an iterable containing a minimum value of `iterable` by comparing the
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
    minWith(value => value.length),
    get,
  ),
)
//=> eating
```

### Defined in

[statistics.d.ts:569](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/statistics.d.ts#L569)
