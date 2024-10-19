[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / join

# Function: join()

Returns the result of concatenating the values of `iterable` to a string where
values are separated by `separator`.

Like `Array.prototype.join`, but for iterables, but does not treat `null`,
`undefined`, or `[]` specially.

## Example

```js
console.log(pipe([`sloth`, `more sloth`, `even more sloth`], join(`, `)))
//=> sloth, more sloth, even more sloth
```

## join(separator)

> **join**(`separator`): (`iterable`) => `string`

Returns the result of concatenating the values of `iterable` to a string where
values are separated by `separator`.

Like `Array.prototype.join`, but for iterables, but does not treat `null`,
`undefined`, or `[]` specially.

### Parameters

• **separator**: `string`

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`unknown`, `any`, `any`\>

#### Returns

`string`

### Example

```js
console.log(pipe([`sloth`, `more sloth`, `even more sloth`], join(`, `)))
//=> sloth, more sloth, even more sloth
```

### Defined in

[collect.d.ts:378](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/collect.d.ts#L378)

## join(separator, iterable)

> **join**(`separator`, `iterable`): `string`

Returns the result of concatenating the values of `iterable` to a string where
values are separated by `separator`.

Like `Array.prototype.join`, but for iterables, but does not treat `null`,
`undefined`, or `[]` specially.

### Parameters

• **separator**: `string`

• **iterable**: `Iterable`\<`unknown`, `any`, `any`\>

### Returns

`string`

### Example

```js
console.log(pipe([`sloth`, `more sloth`, `even more sloth`], join(`, `)))
//=> sloth, more sloth, even more sloth
```

### Defined in

[collect.d.ts:379](https://github.com/TomerAberbach/lfi/blob/dd796c78d3ff68ae7bf4a0272b3cbeca688438e7/src/operations/collect.d.ts#L379)
