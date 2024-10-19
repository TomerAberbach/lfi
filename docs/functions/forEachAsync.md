[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / forEachAsync

# Function: forEachAsync()

Returns a promise that resolves when `fn` has been applied to each value of
`asyncIterable` and the result of each application has been awaited.

The result of applying `fn` to a value is awaited before moving on to the next
value.

Like `Array.prototype.forEach`, but for async iterables.

## Example

```js
const sloths = asAsync([`carl`, `frank`, `phil`])

await forEachAsync(console.log, sloths)
//=> carl
//=> frank
//=> phil
```

## forEachAsync(fn)

> **forEachAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `Promise`\<`void`\>

Returns a promise that resolves when `fn` has been applied to each value of
`asyncIterable` and the result of each application has been awaited.

The result of applying `fn` to a value is awaited before moving on to the next
value.

Like `Array.prototype.forEach`, but for async iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`Promise`\<`void`\>

### Example

```js
const sloths = asAsync([`carl`, `frank`, `phil`])

await forEachAsync(console.log, sloths)
//=> carl
//=> frank
//=> phil
```

### Defined in

[iterate.d.ts:156](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/iterate.d.ts#L156)

## forEachAsync(fn, asyncIterable)

> **forEachAsync**\<`Value`\>(`fn`, `asyncIterable`): `Promise`\<`void`\>

Returns a promise that resolves when `fn` has been applied to each value of
`asyncIterable` and the result of each application has been awaited.

The result of applying `fn` to a value is awaited before moving on to the next
value.

Like `Array.prototype.forEach`, but for async iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`Promise`\<`void`\>

### Example

```js
const sloths = asAsync([`carl`, `frank`, `phil`])

await forEachAsync(console.log, sloths)
//=> carl
//=> frank
//=> phil
```

### Defined in

[iterate.d.ts:159](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/iterate.d.ts#L159)