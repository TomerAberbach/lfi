[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / any

# Function: any()

Returns `true` if `fn` returns a truthy value for any value of `iterable`.
Otherwise returns `false`.

Like `Array.prototype.some`, but for iterables.

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    any(string => string.length > 8),
  ),
)
//=> true
```

## any(fn)

> **any**\<`Value`\>(`fn`): (`iterable`) => `boolean`

Returns `true` if `fn` returns a truthy value for any value of `iterable`.
Otherwise returns `false`.

Like `Array.prototype.some`, but for iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

#### Returns

`boolean`

### Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    any(string => string.length > 8),
  ),
)
//=> true
```

### Defined in

[predicate.d.ts:108](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/predicate.d.ts#L108)

## any(fn, iterable)

> **any**\<`Value`\>(`fn`, `iterable`): `boolean`

Returns `true` if `fn` returns a truthy value for any value of `iterable`.
Otherwise returns `false`.

Like `Array.prototype.some`, but for iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **iterable**: `Iterable`\<`Value`, `any`, `any`\>

### Returns

`boolean`

### Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    any(string => string.length > 8),
  ),
)
//=> true
```

### Defined in

[predicate.d.ts:108](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/predicate.d.ts#L108)
