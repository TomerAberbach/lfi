[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / none

# Function: none()

Returns `true` if `fn` returns a falsy value for all values of `iterable`.
Otherwise returns `false`.

## Example

```js
console.log(
  pipe(
    [`sloth`, `more sloth`, `even more sloth`],
    none(string => string.length > 8),
  ),
)
//=> false
```

## none(fn)

> **none**\<`Value`\>(`fn`): (`iterable`) => `boolean`

Returns `true` if `fn` returns a falsy value for all values of `iterable`.
Otherwise returns `false`.

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
    none(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:165](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/predicate.d.ts#L165)

## none(fn, iterable)

> **none**\<`Value`\>(`fn`, `iterable`): `boolean`

Returns `true` if `fn` returns a falsy value for all values of `iterable`.
Otherwise returns `false`.

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
    none(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:165](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/predicate.d.ts#L165)