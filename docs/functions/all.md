[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / all

# Function: all()

Returns `true` if `fn` returns a truthy value for all values of `iterable`.
Otherwise returns `false`.

Like `Array.prototype.every`, but for iterables.

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    all(string => string.length > 8),
  ),
)
//=> false
```

## all(fn)

> **all**\<`Value`\>(`fn`): (`iterable`) => `boolean`

Returns `true` if `fn` returns a truthy value for all values of `iterable`.
Otherwise returns `false`.

Like `Array.prototype.every`, but for iterables.

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
    all(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:49](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/predicate.d.ts#L49)

## all(fn, iterable)

> **all**\<`Value`\>(`fn`, `iterable`): `boolean`

Returns `true` if `fn` returns a truthy value for all values of `iterable`.
Otherwise returns `false`.

Like `Array.prototype.every`, but for iterables.

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
    all(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:49](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/predicate.d.ts#L49)
