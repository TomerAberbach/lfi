[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / join

# Function: join()

Returns the result of concatenating the values of `iterable` to a string
where values are separated by `separator`.

Like `Array.prototype.join`, but for iterables, but does not treat `null`,
`undefined`, or `[]` specially.

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    join(`, `),
  ),
)
//=> sloth, more sloth, even more sloth
```

## join(separator)

> **join**(`separator`): (`iterable`) => `string`

Returns the result of concatenating the values of `iterable` to a string
where values are separated by `separator`.

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
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    join(`, `),
  ),
)
//=> sloth, more sloth, even more sloth
```

### Defined in

[collections.d.ts:378](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/collections.d.ts#L378)

## join(separator, iterable)

> **join**(`separator`, `iterable`): `string`

Returns the result of concatenating the values of `iterable` to a string
where values are separated by `separator`.

Like `Array.prototype.join`, but for iterables, but does not treat `null`,
`undefined`, or `[]` specially.

### Parameters

• **separator**: `string`

• **iterable**: `Iterable`\<`unknown`, `any`, `any`\>

### Returns

`string`

### Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    join(`, `),
  ),
)
//=> sloth, more sloth, even more sloth
```

### Defined in

[collections.d.ts:379](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/collections.d.ts#L379)
