[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / flatMapConcur

# Function: flatMapConcur()

Returns an concur iterable containing the values of the concur iterables
returned, or resolving from promises returned, from applying `fn` to each
value of `concurIterable`.

Like `Array.prototype.flatMap`, but for concur iterables.

## Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    flatMapConcur(string => [string, string.length]),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
```

## flatMapConcur(fn)

> **flatMapConcur**\<`From`, `To`\>(`fn`): (`concurIterable`) => [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

Returns an concur iterable containing the values of the concur iterables
returned, or resolving from promises returned, from applying `fn` to each
value of `concurIterable`.

Like `Array.prototype.flatMap`, but for concur iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

#### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    flatMapConcur(string => [string, string.length]),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
```

### Defined in

[transform.d.ts:162](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/transform.d.ts#L162)

## flatMapConcur(fn, concurIterable)

> **flatMapConcur**\<`From`, `To`\>(`fn`, `concurIterable`): [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

Returns an concur iterable containing the values of the concur iterables
returned, or resolving from promises returned, from applying `fn` to each
value of `concurIterable`.

Like `Array.prototype.flatMap`, but for concur iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`From`\>

### Returns

[`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`To`\>

### Example

```js
console.log(
  await pipe(
    asConcur([`sloth`, `more sloth`, `even more sloth`]),
    flatMapConcur(string => [string, string.length]),
    reduceConcur(toArray()),
  ),
)
//=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
```

### Defined in

[transform.d.ts:169](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/transform.d.ts#L169)
