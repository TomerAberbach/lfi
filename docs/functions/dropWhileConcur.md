[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / dropWhileConcur

# Function: dropWhileConcur()

Returns a concur iterable containing the values of `concurIterable` in
iteration order starting with the first value for which `fn` returns a value
awaitable to a falsy value.

## Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
    dropWhileConcur(value => value < 5),
    reduceConcur(toArray()),
  ),
)
//=> [ 5, 6, 7, 8, 'sloth' ]
```

## dropWhileConcur(fn)

> **dropWhileConcur**\<`Value`\>(`fn`): (`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` in
iteration order starting with the first value for which `fn` returns a value
awaitable to a falsy value.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
    dropWhileConcur(value => value < 5),
    reduceConcur(toArray()),
  ),
)
//=> [ 5, 6, 7, 8, 'sloth' ]
```

### Defined in

[slice.d.ts:62](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/slice.d.ts#L62)

## dropWhileConcur(fn, concurIterable)

> **dropWhileConcur**\<`Value`\>(`fn`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` in
iteration order starting with the first value for which `fn` returns a value
awaitable to a falsy value.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
    dropWhileConcur(value => value < 5),
    reduceConcur(toArray()),
  ),
)
//=> [ 5, 6, 7, 8, 'sloth' ]
```

### Defined in

[slice.d.ts:62](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/slice.d.ts#L62)
