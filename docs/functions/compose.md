[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / compose

# Function: compose()

Returns a function that takes a single parameter and pipes it through the
given functions.

## Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

## compose()

> **compose**(): \<`Value`\>(`value`) => `Value`

Returns a function that takes a single parameter and pipes it through the
given functions.

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **value**: `Value`

#### Returns

`Value`

### Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:158](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L158)

## compose(fn)

> **compose**\<`A`, `B`\>(`fn`): (`value`) => `B`

Returns a function that takes a single parameter and pipes it through the
given functions.

### Type Parameters

• **A**

• **B**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **value**: `A`

#### Returns

`B`

### Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:159](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L159)

## compose(fn1, fn2)

> **compose**\<`A`, `B`, `C`\>(`fn1`, `fn2`): (`value`) => `C`

Returns a function that takes a single parameter and pipes it through the
given functions.

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

• **fn1**

• **fn2**

### Returns

`Function`

#### Parameters

• **value**: `A`

#### Returns

`C`

### Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:160](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L160)

## compose(fn1, fn2, fn3)

> **compose**\<`A`, `B`, `C`, `D`\>(`fn1`, `fn2`, `fn3`): (`value`) => `D`

Returns a function that takes a single parameter and pipes it through the
given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

### Parameters

• **fn1**

• **fn2**

• **fn3**

### Returns

`Function`

#### Parameters

• **value**: `A`

#### Returns

`D`

### Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:161](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L161)

## compose(fn1, fn2, fn3, fn4)

> **compose**\<`A`, `B`, `C`, `D`, `E`\>(`fn1`, `fn2`, `fn3`, `fn4`): (`value`) => `E`

Returns a function that takes a single parameter and pipes it through the
given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

### Parameters

• **fn1**

• **fn2**

• **fn3**

• **fn4**

### Returns

`Function`

#### Parameters

• **value**: `A`

#### Returns

`E`

### Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:166](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L166)

## compose(fn1, fn2, fn3, fn4, fn5)

> **compose**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`fn1`, `fn2`, `fn3`, `fn4`, `fn5`): (`value`) => `F`

Returns a function that takes a single parameter and pipes it through the
given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

### Parameters

• **fn1**

• **fn2**

• **fn3**

• **fn4**

• **fn5**

### Returns

`Function`

#### Parameters

• **value**: `A`

#### Returns

`F`

### Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:172](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L172)

## compose(fn1, fn2, fn3, fn4, fn5, fn6)

> **compose**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`fn1`, `fn2`, `fn3`, `fn4`, `fn5`, `fn6`): (`value`) => `G`

Returns a function that takes a single parameter and pipes it through the
given functions.

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

### Parameters

• **fn1**

• **fn2**

• **fn3**

• **fn4**

• **fn5**

• **fn6**

### Returns

`Function`

#### Parameters

• **value**: `A`

#### Returns

`G`

### Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:179](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L179)

## compose(fn1, fn2, fn3, fn4, fn5, fn6, fn7)

> **compose**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`fn1`, `fn2`, `fn3`, `fn4`, `fn5`, `fn6`, `fn7`): (`value`) => `H`

Returns a function that takes a single parameter and pipes it through the
given functions.

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

• **fn1**

• **fn2**

• **fn3**

• **fn4**

• **fn5**

• **fn6**

• **fn7**

### Returns

`Function`

#### Parameters

• **value**: `A`

#### Returns

`H`

### Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:187](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L187)

## compose(fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8)

> **compose**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`fn1`, `fn2`, `fn3`, `fn4`, `fn5`, `fn6`, `fn7`, `fn8`): (`value`) => `I`

Returns a function that takes a single parameter and pipes it through the
given functions.

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

• **fn1**

• **fn2**

• **fn3**

• **fn4**

• **fn5**

• **fn6**

• **fn7**

• **fn8**

### Returns

`Function`

#### Parameters

• **value**: `A`

#### Returns

`I`

### Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:196](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L196)

## compose(fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8, fn9)

> **compose**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`fn1`, `fn2`, `fn3`, `fn4`, `fn5`, `fn6`, `fn7`, `fn8`, `fn9`): (`value`) => `J`

Returns a function that takes a single parameter and pipes it through the
given functions.

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

`Function`

#### Parameters

• **value**: `A`

#### Returns

`J`

### Example

```js
const screamify = compose(
  name => `${name.toUpperCase()}!`,
  text => [text, text, text],
  array => array.join(` `),
)

console.log(screamify(`sloth`))
// => SLOTH! SLOTH! SLOTH!
```

### Defined in

[core.d.ts:206](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/core.d.ts#L206)
