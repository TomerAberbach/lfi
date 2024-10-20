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

[iterate.d.ts:183](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/iterate.d.ts#L183)

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

[iterate.d.ts:186](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/iterate.d.ts#L186)
