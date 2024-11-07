[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / forEachConcur

# Function: forEachConcur()

Returns a promise that resolves when `fn` has been applied to each value of
`concurIterable` and the result of each application has been awaited.

Like `Array.prototype.forEach`, but for concur iterables.

## Example

```js
const sloths = asConcur([`carl`, `frank`, `phil`])

await forEachConcur(console.log, sloths)
//=> carl
//=> frank
//=> phil
//
```

## forEachConcur(fn)

> **forEachConcur**\<`Value`\>(`fn`): (`concurIterable`) => `Promise`\<`void`\>

Returns a promise that resolves when `fn` has been applied to each value of
`concurIterable` and the result of each application has been awaited.

Like `Array.prototype.forEach`, but for concur iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

#### Returns

`Promise`\<`void`\>

### Example

```js
const sloths = asConcur([`carl`, `frank`, `phil`])

await forEachConcur(console.log, sloths)
//=> carl
//=> frank
//=> phil
//
```

### Defined in

[side-effects.d.ts:183](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/side-effects.d.ts#L183)

## forEachConcur(fn, concurIterable)

> **forEachConcur**\<`Value`\>(`fn`, `concurIterable`): `Promise`\<`void`\>

Returns a promise that resolves when `fn` has been applied to each value of
`concurIterable` and the result of each application has been awaited.

Like `Array.prototype.forEach`, but for concur iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **concurIterable**: [`ConcurIterable`](../type-aliases/ConcurIterable.md)\<`Value`\>

### Returns

`Promise`\<`void`\>

### Example

```js
const sloths = asConcur([`carl`, `frank`, `phil`])

await forEachConcur(console.log, sloths)
//=> carl
//=> frank
//=> phil
//
```

### Defined in

[side-effects.d.ts:186](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/side-effects.d.ts#L186)
