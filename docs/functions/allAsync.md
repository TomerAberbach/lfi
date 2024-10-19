[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / allAsync

# Function: allAsync()

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for all values of `asyncIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.every`, but for async iterables.

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    allAsync(string => string.length > 8),
  ),
)
//=> false
```

## allAsync(fn)

> **allAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for all values of `asyncIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.every`, but for async iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`Promise`\<`boolean`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    allAsync(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:69](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/predicate.d.ts#L69)

## allAsync(fn, asyncIterable)

> **allAsync**\<`Value`\>(`fn`, `asyncIterable`): `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for all values of `asyncIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.every`, but for async iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`Promise`\<`boolean`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    allAsync(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:69](https://github.com/TomerAberbach/lfi/blob/d7a0f90dd72245d6efd6bd97c58a78b3f3028f25/src/operations/predicate.d.ts#L69)
