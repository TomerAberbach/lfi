[**lfi**](../readme.md) • **Docs**

---

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

> **findLast**\<`Value`\>(`fn`): (`iterable`) =>
> [`Optional`](../type-aliases/Optional.md)\<`Value`\>

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

[find.d.ts:160](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/find.d.ts#L160)

## findLast(fn, iterable)

> **findLast**\<`Value`\>(`fn`, `iterable`):
> [`Optional`](../type-aliases/Optional.md)\<`Value`\>

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

[find.d.ts:160](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/find.d.ts#L160)