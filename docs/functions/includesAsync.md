[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / includesAsync

# Function: includesAsync()

Returns a promise that resolves to `true` if any value of `asyncIterable` is
equal to `searchElement` using `Object.is`. Otherwise returns a promise that
resolves to `false`.

Like `Array.prototype.includes`, but for async iterables.

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    includesAsync(3),
  ),
)
//=> true
```

## includesAsync(searchElement)

> **includesAsync**(`searchElement`): \<`Value`\>(`asyncIterable`) =>
> `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if any value of `asyncIterable` is
equal to `searchElement` using `Object.is`. Otherwise returns a promise that
resolves to `false`.

Like `Array.prototype.includes`, but for async iterables.

### Parameters

• **searchElement**: `unknown`

### Returns

`Function`

#### Type Parameters

• **Value**

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`Promise`\<`boolean`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    includesAsync(3),
  ),
)
//=> true
```

### Defined in

[predicate.d.ts:244](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/predicate.d.ts#L244)

## includesAsync(searchElement, asyncIterable)

> **includesAsync**\<`Value`\>(`searchElement`, `asyncIterable`):
> `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if any value of `asyncIterable` is
equal to `searchElement` using `Object.is`. Otherwise returns a promise that
resolves to `false`.

Like `Array.prototype.includes`, but for async iterables.

### Type Parameters

• **Value**

### Parameters

• **searchElement**: `unknown`

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`Promise`\<`boolean`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    includesAsync(3),
  ),
)
//=> true
```

### Defined in

[predicate.d.ts:247](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/predicate.d.ts#L247)
