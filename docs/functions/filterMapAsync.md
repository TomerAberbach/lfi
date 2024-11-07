[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / filterMapAsync

# Function: filterMapAsync()

Returns an async iterable containing the values of `asyncIterable`
transformed by `fn` in iteration order excluding the values for which `fn`
returns a value awaitable to null or undefined.

## Example

```js
console.log(
  await pipe(
    asAsync([
      { sloth: `sloth party` },
      { notSloth: `building` },
      { sloth: `sloths in trees` },
      { notSloth: `city` },
    ]),
    filterMapAsync(object => object.sloth),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

## filterMapAsync(fn)

> **filterMapAsync**\<`From`, `To`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`NonNullable`\<`To`\>, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable`
transformed by `fn` in iteration order excluding the values for which `fn`
returns a value awaitable to null or undefined.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`From`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`NonNullable`\<`To`\>, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([
      { sloth: `sloth party` },
      { notSloth: `building` },
      { sloth: `sloths in trees` },
      { notSloth: `city` },
    ]),
    filterMapAsync(object => object.sloth),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

[filters.d.ts:170](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L170)

## filterMapAsync(fn, asyncIterable)

> **filterMapAsync**\<`From`, `To`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`NonNullable`\<`To`\>, `any`, `any`\>

Returns an async iterable containing the values of `asyncIterable`
transformed by `fn` in iteration order excluding the values for which `fn`
returns a value awaitable to null or undefined.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`From`, `any`, `any`\>

### Returns

`AsyncIterable`\<`NonNullable`\<`To`\>, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([
      { sloth: `sloth party` },
      { notSloth: `building` },
      { sloth: `sloths in trees` },
      { notSloth: `city` },
    ]),
    filterMapAsync(object => object.sloth),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

[filters.d.ts:173](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L173)
