[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / atConcur

# Function: atConcur()

Returns a concur iterable containing the value at the given `index` of
`concurIterable` in iteration order, or an empty concur iterable if `index`
is out of bounds.

WARNING: This function linearly iterates up to `index` because concur
iterables do not support random access.

## Throws

if `index` is not a non-negative integer.

## Example

```js
const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    concurIterable,
    atConcur(1),
    getConcur,
  ),
)
//=> 'more sloth'
```

## atConcur(index)

> **atConcur**\<`Index`\>(`index`): \<`Value`\>(`concurIterable`) => [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns a concur iterable containing the value at the given `index` of
`concurIterable` in iteration order, or an empty concur iterable if `index`
is out of bounds.

WARNING: This function linearly iterates up to `index` because concur
iterables do not support random access.

### Type Parameters

• **Index** *extends* `number`

### Parameters

• **index**: `NonNegativeInteger`\<`Index`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

### Throws

if `index` is not a non-negative integer.

### Example

```js
const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    concurIterable,
    atConcur(1),
    getConcur,
  ),
)
//=> 'more sloth'
```

### Defined in

[splices.d.ts:773](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L773)

## atConcur(index, concurIterable)

> **atConcur**\<`Index`, `Value`\>(`index`, `concurIterable`): [`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

Returns a concur iterable containing the value at the given `index` of
`concurIterable` in iteration order, or an empty concur iterable if `index`
is out of bounds.

WARNING: This function linearly iterates up to `index` because concur
iterables do not support random access.

### Type Parameters

• **Index** *extends* `number`

• **Value**

### Parameters

• **index**: `NonNegativeInteger`\<`Index`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurOptional`](../type-aliases/ConcurOptional.md)\<`Value`\>

### Throws

if `index` is not a non-negative integer.

### Example

```js
const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])

console.log(
  await pipe(
    concurIterable,
    atConcur(1),
    getConcur,
  ),
)
//=> 'more sloth'
```

### Defined in

[splices.d.ts:776](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/splices.d.ts#L776)
