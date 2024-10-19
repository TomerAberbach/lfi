[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / compose

# Function: compose()

Returns a function that takes a single parameter and pipes it through the given
functions.

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

Returns a function that takes a single parameter and pipes it through the given
functions.

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

[fn.d.ts:156](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/fn.d.ts#L156)

## compose(fn)

> **compose**\<`A`, `B`\>(`fn`): (`value`) => `B`

Returns a function that takes a single parameter and pipes it through the given
functions.

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

[fn.d.ts:157](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/fn.d.ts#L157)

## compose(fn1, fn2)

> **compose**\<`A`, `B`, `C`\>(`fn1`, `fn2`): (`value`) => `C`

Returns a function that takes a single parameter and pipes it through the given
functions.

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

[fn.d.ts:158](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/fn.d.ts#L158)

## compose(fn1, fn2, fn3)

> **compose**\<`A`, `B`, `C`, `D`\>(`fn1`, `fn2`, `fn3`): (`value`) => `D`

Returns a function that takes a single parameter and pipes it through the given
functions.

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

[fn.d.ts:159](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/fn.d.ts#L159)

## compose(fn1, fn2, fn3, fn4)

> **compose**\<`A`, `B`, `C`, `D`, `E`\>(`fn1`, `fn2`, `fn3`, `fn4`): (`value`)
> => `E`

Returns a function that takes a single parameter and pipes it through the given
functions.

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

[fn.d.ts:164](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/fn.d.ts#L164)

## compose(fn1, fn2, fn3, fn4, fn5)

> **compose**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`fn1`, `fn2`, `fn3`, `fn4`,
> `fn5`): (`value`) => `F`

Returns a function that takes a single parameter and pipes it through the given
functions.

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

[fn.d.ts:170](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/fn.d.ts#L170)

## compose(fn1, fn2, fn3, fn4, fn5, fn6)

> **compose**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`fn1`, `fn2`, `fn3`, `fn4`,
> `fn5`, `fn6`): (`value`) => `G`

Returns a function that takes a single parameter and pipes it through the given
functions.

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

[fn.d.ts:177](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/fn.d.ts#L177)

## compose(fn1, fn2, fn3, fn4, fn5, fn6, fn7)

> **compose**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`fn1`, `fn2`, `fn3`,
> `fn4`, `fn5`, `fn6`, `fn7`): (`value`) => `H`

Returns a function that takes a single parameter and pipes it through the given
functions.

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

[fn.d.ts:185](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/fn.d.ts#L185)

## compose(fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8)

> **compose**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`fn1`, `fn2`,
> `fn3`, `fn4`, `fn5`, `fn6`, `fn7`, `fn8`): (`value`) => `I`

Returns a function that takes a single parameter and pipes it through the given
functions.

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

[fn.d.ts:194](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/fn.d.ts#L194)

## compose(fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8, fn9)

> **compose**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`fn1`, `fn2`,
> `fn3`, `fn4`, `fn5`, `fn6`, `fn7`, `fn8`, `fn9`): (`value`) => `J`

Returns a function that takes a single parameter and pipes it through the given
functions.

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

[fn.d.ts:204](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/fn.d.ts#L204)
