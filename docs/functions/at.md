[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / at

# Function: at()

Returns an iterable containing the value at the given `index` of `iterable`
or an empty iterable if `index` is out of bounds.

WARNING: This function linearly iterates up to `index` because iterables do
not support random access.

## Throws

if `index` is not a non-negative integer.

## Example

```js
const iterable = [`sloth`, `more sloth`, `even more sloth`]

console.log(
  pipe(
    iterable,
    at(1),
    get,
  ),
)
//=> 'more sloth'
```

## at(index)

> **at**\<`Index`\>(`index`): \<`Value`\>(`iterable`) => [`Optional`](../type-aliases/Optional.md)\<`Value`\>

Returns an iterable containing the value at the given `index` of `iterable`
or an empty iterable if `index` is out of bounds.

WARNING: This function linearly iterates up to `index` because iterables do
not support random access.

### Type Parameters

• **Index** *extends* `number`

### Parameters

• **index**: `NonNegativeInteger`\<`Index`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

[`Optional`](../type-aliases/Optional.md)\<`Value`\>

### Throws

if `index` is not a non-negative integer.

### Example

```js
const iterable = [`sloth`, `more sloth`, `even more sloth`]

console.log(
  pipe(
    iterable,
    at(1),
    get,
  ),
)
//=> 'more sloth'
```

### Defined in

[slice.d.ts:706](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L706)

## at(index, iterable)

> **at**\<`Index`, `Value`\>(`index`, `iterable`): [`Optional`](../type-aliases/Optional.md)\<`Value`\>

Returns an iterable containing the value at the given `index` of `iterable`
or an empty iterable if `index` is out of bounds.

WARNING: This function linearly iterates up to `index` because iterables do
not support random access.

### Type Parameters

• **Index** *extends* `number`

• **Value**

### Parameters

• **index**: `NonNegativeInteger`\<`Index`\>

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

[`Optional`](../type-aliases/Optional.md)\<`Value`\>

### Throws

if `index` is not a non-negative integer.

### Example

```js
const iterable = [`sloth`, `more sloth`, `even more sloth`]

console.log(
  pipe(
    iterable,
    at(1),
    get,
  ),
)
//=> 'more sloth'
```

### Defined in

[slice.d.ts:709](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L709)
