[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / find

# Function: find()

Returns an iterable containing the first value of `iterable` for which `fn`
returns a truthy value. Otherwise, returns an empty iterable.

Like `Array.prototype.find`, but for iterables.

## Example

```js
const iterable = [1, 2, `sloth`, 4, `other string`]

console.log(
  pipe(
    iterable,
    find(value => typeof value === `string`),
    or(() => `yawn!`),
  )
)
//=> sloth

console.log(
  pipe(
    iterable,
    find(value => Array.isArray(value)),
    or(() => `yawn!`),
  )
)
//=> yawn!
```

## find(fn)

> **find**\<`Value`\>(`fn`): (`iterable`) => [`Optional`](../type-aliases/Optional.md)\<`Value`\>

Returns an iterable containing the first value of `iterable` for which `fn`
returns a truthy value. Otherwise, returns an empty iterable.

Like `Array.prototype.find`, but for iterables.

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
    find(value => typeof value === `string`),
    or(() => `yawn!`),
  )
)
//=> sloth

console.log(
  pipe(
    iterable,
    find(value => Array.isArray(value)),
    or(() => `yawn!`),
  )
)
//=> yawn!
```

### Defined in

[filters.d.ts:497](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L497)

## find(fn, iterable)

> **find**\<`Value`\>(`fn`, `iterable`): [`Optional`](../type-aliases/Optional.md)\<`Value`\>

Returns an iterable containing the first value of `iterable` for which `fn`
returns a truthy value. Otherwise, returns an empty iterable.

Like `Array.prototype.find`, but for iterables.

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
    find(value => typeof value === `string`),
    or(() => `yawn!`),
  )
)
//=> sloth

console.log(
  pipe(
    iterable,
    find(value => Array.isArray(value)),
    or(() => `yawn!`),
  )
)
//=> yawn!
```

### Defined in

[filters.d.ts:497](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L497)
