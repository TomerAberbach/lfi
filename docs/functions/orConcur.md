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

optionals.d.ts:89

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

optionals.d.ts:92
