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

[exclude.d.ts:169](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/exclude.d.ts#L169)

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

[exclude.d.ts:172](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/exclude.d.ts#L172)
