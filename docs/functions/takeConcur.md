[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / takeConcur

# Function: takeConcur()

Returns a concur iterable containing the first `count` values of
`concurIterable` in iteration order.

If the `count` is greater than the number of values in `concurIterable`, then
a concur iterable equivalent `concurIterable` is returned.

## Throws

if `count` isn't a non-negative integer.

## Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, `sloth`]),
    takeConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ 1, 2, 3 ]
```

## takeConcur(count)

> **takeConcur**\<`Count`\>(`count`): \<`Value`\>(`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the first `count` values of
`concurIterable` in iteration order.

If the `count` is greater than the number of values in `concurIterable`, then
a concur iterable equivalent `concurIterable` is returned.

### Type Parameters

• **Count** *extends* `number`

### Parameters

• **count**: `NonNegativeInteger`\<`Count`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Throws

if `count` isn't a non-negative integer.

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, `sloth`]),
    takeConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ 1, 2, 3 ]
```

### Defined in

[slice.d.ts:291](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L291)

## takeConcur(count, concurIterable)

> **takeConcur**\<`Count`, `Value`\>(`count`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the first `count` values of
`concurIterable` in iteration order.

If the `count` is greater than the number of values in `concurIterable`, then
a concur iterable equivalent `concurIterable` is returned.

### Type Parameters

• **Count** *extends* `number`

• **Value**

### Parameters

• **count**: `NonNegativeInteger`\<`Count`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Throws

if `count` isn't a non-negative integer.

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, `sloth`]),
    takeConcur(3),
    reduceConcur(toArray()),
  ),
)
//=> [ 1, 2, 3 ]
```

### Defined in

[slice.d.ts:291](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/slice.d.ts#L291)
