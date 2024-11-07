[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / orAsync

# Function: orAsync()

Returns a promise that resolves to the only value in `asyncIterable` if it
contains exactly one value. Otherwise, returns a promise that resolves to
the awaited result of invoking `fn`.

## Example

```js
console.log(await pipe(asAsync([`sloth`]), orAsync(() => `Never called`)))
//=> sloth

console.log(await pipe(emptyAsync, orAsync(() => `I get called!`)))
//=> I get called!

console.log(
  await pipe(
    asAsync([1, `sloth`, 3]),
    orAsync(() => `I also get called!`),
  ),
)
//=> I also get called!
```

## orAsync(fn)

> **orAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `Promise`\<`Value`\>

Returns a promise that resolves to the only value in `asyncIterable` if it
contains exactly one value. Otherwise, returns a promise that resolves to
the awaited result of invoking `fn`.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`Promise`\<`Value`\>

### Example

```js
console.log(await pipe(asAsync([`sloth`]), orAsync(() => `Never called`)))
//=> sloth

console.log(await pipe(emptyAsync, orAsync(() => `I get called!`)))
//=> I get called!

console.log(
  await pipe(
    asAsync([1, `sloth`, 3]),
    orAsync(() => `I also get called!`),
  ),
)
//=> I also get called!
```

### Defined in

optionals.d.ts:57

## orAsync(fn, asyncIterable)

> **orAsync**\<`Value`\>(`fn`, `asyncIterable`): `Promise`\<`Value`\>

Returns a promise that resolves to the only value in `asyncIterable` if it
contains exactly one value. Otherwise, returns a promise that resolves to
the awaited result of invoking `fn`.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`Promise`\<`Value`\>

### Example

```js
console.log(await pipe(asAsync([`sloth`]), orAsync(() => `Never called`)))
//=> sloth

console.log(await pipe(emptyAsync, orAsync(() => `I get called!`)))
//=> I get called!

console.log(
  await pipe(
    asAsync([1, `sloth`, 3]),
    orAsync(() => `I also get called!`),
  ),
)
//=> I also get called!
```

### Defined in

optionals.d.ts:60
