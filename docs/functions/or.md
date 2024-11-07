[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / or

# Function: or()

Returns the only value in `iterable` if it contains exactly one value.
Otherwise, returns the result of invoking `fn`.

## Example

```js
console.log(pipe([`sloth`], or(() => `Never called`)))
//=> sloth

console.log(pipe([], or(() => `I get called!`)))
//=> I get called!

console.log(pipe([1, `sloth`, 3], or(() => `I also get called!`)))
//=> I also get called!
```

## or(fn)

> **or**\<`Value`\>(`fn`): (`iterable`) => `Value`

Returns the only value in `iterable` if it contains exactly one value.
Otherwise, returns the result of invoking `fn`.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`Value`

### Example

```js
console.log(pipe([`sloth`], or(() => `Never called`)))
//=> sloth

console.log(pipe([], or(() => `I get called!`)))
//=> I get called!

console.log(pipe([1, `sloth`, 3], or(() => `I also get called!`)))
//=> I also get called!
```

### Defined in

[optionals.d.ts:30](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/optionals.d.ts#L30)

## or(fn, iterable)

> **or**\<`Value`\>(`fn`, `iterable`): `Value`

Returns the only value in `iterable` if it contains exactly one value.
Otherwise, returns the result of invoking `fn`.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`Value`

### Example

```js
console.log(pipe([`sloth`], or(() => `Never called`)))
//=> sloth

console.log(pipe([], or(() => `I get called!`)))
//=> I get called!

console.log(pipe([1, `sloth`, 3], or(() => `I also get called!`)))
//=> I also get called!
```

### Defined in

[optionals.d.ts:31](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/optionals.d.ts#L31)
