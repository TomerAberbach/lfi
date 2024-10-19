[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / flatMapAsync

# Function: flatMapAsync()

Returns an async iterable containing the values of the async iterables
returned, or resolving from promises returned, from applying `fn` to each
value of `asyncIterable` in iteration order.

Like `Array.prototype.flatMap`, but for async iterables.

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    flatMapAsync(string => [string, string.length]),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
```

## flatMapAsync(fn)

> **flatMapAsync**\<`From`, `To`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`To`, `any`, `any`\>

Returns an async iterable containing the values of the async iterables
returned, or resolving from promises returned, from applying `fn` to each
value of `asyncIterable` in iteration order.

Like `Array.prototype.flatMap`, but for async iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`From`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`To`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    flatMapAsync(string => [string, string.length]),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
```

### Defined in

[transform.d.ts:133](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/transform.d.ts#L133)

## flatMapAsync(fn, asyncIterable)

> **flatMapAsync**\<`From`, `To`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`To`, `any`, `any`\>

Returns an async iterable containing the values of the async iterables
returned, or resolving from promises returned, from applying `fn` to each
value of `asyncIterable` in iteration order.

Like `Array.prototype.flatMap`, but for async iterables.

### Type Parameters

• **From**

• **To**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`From`, `any`, `any`\>

### Returns

`AsyncIterable`\<`To`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth`, `more sloth`, `even more sloth`]),
    flatMapAsync(string => [string, string.length]),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth', 5, 'more sloth', 10, 'even more sloth', 15 ]
```

### Defined in

[transform.d.ts:136](https://github.com/TomerAberbach/lfi/blob/fd6e1ff9d7b7d249090f89ead6d0a30e26aba2e4/src/operations/transform.d.ts#L136)
