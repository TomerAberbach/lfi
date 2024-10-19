[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / forEach

# Function: forEach()

Applies `fn` to each value of `iterable`.

Like `Array.prototype.forEach`, but for iterables.

## Example

```js
const sloths = [`carl`, `frank`, `phil`]

forEach(console.log, sloths)
//=> carl
//=> frank
//=> phil
```

## forEach(fn)

> **forEach**\<`Value`\>(`fn`): (`iterable`) => `void`

Applies `fn` to each value of `iterable`.

Like `Array.prototype.forEach`, but for iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`void`

### Example

```js
const sloths = [`carl`, `frank`, `phil`]

forEach(console.log, sloths)
//=> carl
//=> frank
//=> phil
```

### Defined in

[iterate.d.ts:132](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/iterate.d.ts#L132)

## forEach(fn, iterable)

> **forEach**\<`Value`\>(`fn`, `iterable`): `void`

Applies `fn` to each value of `iterable`.

Like `Array.prototype.forEach`, but for iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`void`

### Example

```js
const sloths = [`carl`, `frank`, `phil`]

forEach(console.log, sloths)
//=> carl
//=> frank
//=> phil
```

### Defined in

[iterate.d.ts:133](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/iterate.d.ts#L133)
