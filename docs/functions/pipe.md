[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / pipe

# Function: pipe()

Returns the result of piping `value` through the given functions.

## Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

## pipe(value)

> **pipe**\<`Value`\>(`value`): `Value`

Returns the result of piping `value` through the given functions.

### Type Parameters

• **Value**

### Parameters

• **value**: `Value`

### Returns

`Value`

### Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:73](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L73)

## pipe(value, fn)

> **pipe**\<`A`, `B`\>(`value`, `fn`): `B`

Returns the result of piping `value` through the given functions.

### Type Parameters

• **A**

• **B**

### Parameters

• **value**: `A`

• **fn**

### Returns

`B`

### Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:74](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L74)

## pipe(value, fn1, fn2)

> **pipe**\<`A`, `B`, `C`\>(`value`, `fn1`, `fn2`): `C`

Returns the result of piping `value` through the given functions.

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

• **value**: `A`

• **fn1**

• **fn2**

### Returns

`C`

### Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:75](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L75)

## pipe(value, fn1, fn2, fn3)

> **pipe**\<`A`, `B`, `C`, `D`\>(`value`, `fn1`, `fn2`, `fn3`): `D`

Returns the result of piping `value` through the given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

### Parameters

• **value**: `A`

• **fn1**

• **fn2**

• **fn3**

### Returns

`D`

### Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:76](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L76)

## pipe(value, fn1, fn2, fn3, fn4)

> **pipe**\<`A`, `B`, `C`, `D`, `E`\>(`value`, `fn1`, `fn2`, `fn3`, `fn4`): `E`

Returns the result of piping `value` through the given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

### Parameters

• **value**: `A`

• **fn1**

• **fn2**

• **fn3**

• **fn4**

### Returns

`E`

### Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:82](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L82)

## pipe(value, fn1, fn2, fn3, fn4, fn5)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`value`, `fn1`, `fn2`, `fn3`, `fn4`, `fn5`): `F`

Returns the result of piping `value` through the given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

### Parameters

• **value**: `A`

• **fn1**

• **fn2**

• **fn3**

• **fn4**

• **fn5**

### Returns

`F`

### Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:89](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L89)

## pipe(value, fn1, fn2, fn3, fn4, fn5, fn6)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`value`, `fn1`, `fn2`, `fn3`, `fn4`, `fn5`, `fn6`): `G`

Returns the result of piping `value` through the given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

### Parameters

• **value**: `A`

• **fn1**

• **fn2**

• **fn3**

• **fn4**

• **fn5**

• **fn6**

### Returns

`G`

### Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:97](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L97)

## pipe(value, fn1, fn2, fn3, fn4, fn5, fn6, fn7)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`value`, `fn1`, `fn2`, `fn3`, `fn4`, `fn5`, `fn6`, `fn7`): `H`

Returns the result of piping `value` through the given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

### Parameters

• **value**: `A`

• **fn1**

• **fn2**

• **fn3**

• **fn4**

• **fn5**

• **fn6**

• **fn7**

### Returns

`H`

### Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:106](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L106)

## pipe(value, fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`value`, `fn1`, `fn2`, `fn3`, `fn4`, `fn5`, `fn6`, `fn7`, `fn8`): `I`

Returns the result of piping `value` through the given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

### Parameters

• **value**: `A`

• **fn1**

• **fn2**

• **fn3**

• **fn4**

• **fn5**

• **fn6**

• **fn7**

• **fn8**

### Returns

`I`

### Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:116](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L116)

## pipe(value, fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8, fn9)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`value`, `fn1`, `fn2`, `fn3`, `fn4`, `fn5`, `fn6`, `fn7`, `fn8`, `fn9`): `J`

Returns the result of piping `value` through the given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

### Parameters

• **value**: `A`

• **fn1**

• **fn2**

• **fn3**

• **fn4**

• **fn5**

• **fn6**

• **fn7**

• **fn8**

• **fn9**

### Returns

`J`

### Example

```js
console.log(
  pipe(
    `sloth`,
    name => `${name.toUpperCase()}!`,
    text => [text, text, text],
    array => array.join(` `),
  ),
)
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:127](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L127)
