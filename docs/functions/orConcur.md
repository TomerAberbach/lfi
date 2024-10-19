[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / orConcur

# Function: orConcur()

Returns a promise that resolves to the only value in `concurIterable` if it
contains exactly one value. Otherwise, returns a promise that resolves to
the awaited result of invoking `fn`.

## Example

```js
console.log(await pipe(asConcur([`sloth`]), orConcur(() => `Never called`)))
//=> sloth

console.log(await pipe(emptyConcur, orConcur(() => `I get called!`)))
//=> I get called!

console.log(
  await pipe(
    asConcur([1, `sloth`, 3]),
    orConcur(() => `I also get called!`),
  ),
)
//=> I also get called!
```

## orConcur(fn)

> **orConcur**\<`Value`\>(`fn`): (`concurIterable`) => `Promise`\<`Value`\>

Returns a promise that resolves to the only value in `concurIterable` if it
contains exactly one value. Otherwise, returns a promise that resolves to
the awaited result of invoking `fn`.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

`Promise`\<`Value`\>

### Example

```js
console.log(await pipe(asConcur([`sloth`]), orConcur(() => `Never called`)))
//=> sloth

console.log(await pipe(emptyConcur, orConcur(() => `I get called!`)))
//=> I get called!

console.log(
  await pipe(
    asConcur([1, `sloth`, 3]),
    orConcur(() => `I also get called!`),
  ),
)
//=> I also get called!
```

### Defined in

[optional.d.ts:89](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/optional.d.ts#L89)

## orConcur(fn, concurIterable)

> **orConcur**\<`Value`\>(`fn`, `concurIterable`): `Promise`\<`Value`\>

Returns a promise that resolves to the only value in `concurIterable` if it
contains exactly one value. Otherwise, returns a promise that resolves to
the awaited result of invoking `fn`.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

`Promise`\<`Value`\>

### Example

```js
console.log(await pipe(asConcur([`sloth`]), orConcur(() => `Never called`)))
//=> sloth

console.log(await pipe(emptyConcur, orConcur(() => `I get called!`)))
//=> I get called!

console.log(
  await pipe(
    asConcur([1, `sloth`, 3]),
    orConcur(() => `I also get called!`),
  ),
)
//=> I also get called!
```

### Defined in

[optional.d.ts:92](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/optional.d.ts#L92)
