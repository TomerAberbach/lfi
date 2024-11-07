[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / findLast

# Function: findLast()

Returns an iterable containing the last value of `iterable` for which `fn`
returns a truthy value. Otherwise, returns an empty iterable.

## Example

```js
const iterable = [1, 2, `sloth`, 4, `other string`]

console.log(
  pipe(
    iterable,
    findLast(value => typeof value === `string`),
    or(() => `yawn!`),
  ),
)
//=> other string

console.log(
  pipe(
    iterable,
    findLast(value => Array.isArray(value)),
    or(() => `yawn!`),
  ),
)
//=> yawn!
```

## findLast(fn)

> **findLast**\<`Value`\>(`fn`): (`iterable`) => [`Optional`](../type-aliases/Optional.md)\<`Value`\>

Returns an iterable containing the last value of `iterable` for which `fn`
returns a truthy value. Otherwise, returns an empty iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

[`Optional`](../type-aliases/Optional.md)\<`Value`\>

### Example

```js
const iterable = [1, 2, `sloth`, 4, `other string`]

console.log(
  pipe(
    iterable,
    findLast(value => typeof value === `string`),
    or(() => `yawn!`),
  ),
)
//=> other string

console.log(
  pipe(
    iterable,
    findLast(value => Array.isArray(value)),
    or(() => `yawn!`),
  ),
)
//=> yawn!
```

### Defined in

[filters.d.ts:590](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L590)

## findLast(fn, iterable)

> **findLast**\<`Value`\>(`fn`, `iterable`): [`Optional`](../type-aliases/Optional.md)\<`Value`\>

Returns an iterable containing the last value of `iterable` for which `fn`
returns a truthy value. Otherwise, returns an empty iterable.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

[`Optional`](../type-aliases/Optional.md)\<`Value`\>

### Example

```js
const iterable = [1, 2, `sloth`, 4, `other string`]

console.log(
  pipe(
    iterable,
    findLast(value => typeof value === `string`),
    or(() => `yawn!`),
  ),
)
//=> other string

console.log(
  pipe(
    iterable,
    findLast(value => Array.isArray(value)),
    or(() => `yawn!`),
  ),
)
//=> yawn!
```

### Defined in

[filters.d.ts:590](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L590)
