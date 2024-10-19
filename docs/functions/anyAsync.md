[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / anyAsync

# Function: anyAsync()

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for any value of `asyncIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.some`, but for async iterables.

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    anyAsync(string => string.length > 8),
  ),
)
//=> true
```

## anyAsync(fn)

> **anyAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for any value of `asyncIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.some`, but for async iterables.

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
    anyAsync(string => string.length > 8),
  ),
)
//=> true
```

### Defined in

[predicate.d.ts:128](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/predicate.d.ts#L128)

## anyAsync(fn, asyncIterable)

> **anyAsync**\<`Value`\>(`fn`, `asyncIterable`): `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a truthy value or a
promise that resolves to a truthy value for any value of `asyncIterable`.
Otherwise returns a promise that resolves to `false`.

Like `Array.prototype.some`, but for async iterables.

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
    anyAsync(string => string.length > 8),
  ),
)
//=> true
```

### Defined in

[predicate.d.ts:128](https://github.com/TomerAberbach/lfi/blob/85d6360ac7d8f71c70f308d2ace5bc2aa99ab03d/src/operations/predicate.d.ts#L128)
