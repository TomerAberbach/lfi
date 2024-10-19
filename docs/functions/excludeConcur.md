[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / excludeConcur

# Function: excludeConcur()

Returns a concur iterable containing the values of `concurIterable` in
iteration order excluding the values of `excluded`.

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    excludeConcur([`mean`, `fast`]),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'sleep', 'slow' ]
```

## excludeConcur(excluded)

> **excludeConcur**(`excluded`): \<`Value`\>(`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` in
iteration order excluding the values of `excluded`.

### Parameters

• **excluded**: `Iterable`\<`unknown`, `any`, `any`\>

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    excludeConcur([`mean`, `fast`]),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'sleep', 'slow' ]
```

### Defined in

[exclude.d.ts:279](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/exclude.d.ts#L279)

## excludeConcur(excluded, concurIterable)

> **excludeConcur**\<`Value`\>(`excluded`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

Returns a concur iterable containing the values of `concurIterable` in
iteration order excluding the values of `excluded`.

### Type Parameters

• **Value**

### Parameters

• **excluded**: `Iterable`\<`unknown`, `any`, `any`\>

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
    excludeConcur([`mean`, `fast`]),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 'sleep', 'slow' ]
```

### Defined in

[exclude.d.ts:282](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/exclude.d.ts#L282)
