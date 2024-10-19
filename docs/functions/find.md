[**lfi**](../readme.md) • **Docs**

---

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
  ),
)
//=> sloth

console.log(
  pipe(
    iterable,
    find(value => Array.isArray(value)),
    or(() => `yawn!`),
  ),
)
//=> yawn!
```

## find(fn)

> **find**\<`Value`\>(`fn`): (`iterable`) =>
> [`Optional`](../type-aliases/Optional.md)\<`Value`\>

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
  ),
)
//=> sloth

console.log(
  pipe(
    iterable,
    find(value => Array.isArray(value)),
    or(() => `yawn!`),
  ),
)
//=> yawn!
```

### Defined in

[find.d.ts:67](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/find.d.ts#L67)

## find(fn, iterable)

> **find**\<`Value`\>(`fn`, `iterable`):
> [`Optional`](../type-aliases/Optional.md)\<`Value`\>

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
  ),
)
//=> sloth

console.log(
  pipe(
    iterable,
    find(value => Array.isArray(value)),
    or(() => `yawn!`),
  ),
)
//=> yawn!
```

### Defined in

[find.d.ts:67](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/find.d.ts#L67)
