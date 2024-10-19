[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / noneAsync

# Function: noneAsync()

Returns a promise that resolves to `true` if `fn` returns a falsy value or a
promise that resolves to a falsy value for all values of `asyncIterable`.
Otherwise returns a promise that resolves to `false`.

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    noneAsync(string => string.length > 8),
  ),
)
//=> false
```

## noneAsync(fn)

> **noneAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a falsy value or a
promise that resolves to a falsy value for all values of `asyncIterable`.
Otherwise returns a promise that resolves to `false`.

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
    noneAsync(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:183](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/predicate.d.ts#L183)

## noneAsync(fn, asyncIterable)

> **noneAsync**\<`Value`\>(`fn`, `asyncIterable`): `Promise`\<`boolean`\>

Returns a promise that resolves to `true` if `fn` returns a falsy value or a
promise that resolves to a falsy value for all values of `asyncIterable`.
Otherwise returns a promise that resolves to `false`.

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
    noneAsync(string => string.length > 8),
  ),
)
//=> false
```

### Defined in

[predicate.d.ts:183](https://github.com/TomerAberbach/lfi/blob/e98b31ea37c84de0758cf58c8fcf28193f36b533/src/operations/predicate.d.ts#L183)
