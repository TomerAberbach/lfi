[**lfi**](../readme.md) • **Docs**

***

[lfi](../globals.md) / filterAsync

# Function: filterAsync()

Returns an async iterable that contains the values of `asyncIterable` in
iteration order excluding the values for which `fn` returns a value awaitable
to a falsy value.

Like `Array.prototype.filter`, but for async iterables.

## Example

```js
console.log(
  await pipe(
    asAsync([`sloth party`, `building`, `sloths in trees`, `city`]),
    filterAsync(string => string.includes(`sloth`)),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

## filterAsync(fn)

> **filterAsync**\<`From`, `To`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`To`, `any`, `any`\>

Returns an async iterable that contains the values of `asyncIterable` in
iteration order excluding the values for which `fn` returns a value awaitable
to a falsy value.

Like `Array.prototype.filter`, but for async iterables.

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
    asAsync([`sloth party`, `building`, `sloths in trees`, `city`]),
    filterAsync(string => string.includes(`sloth`)),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

[filters.d.ts:61](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L61)

## filterAsync(fn, asyncIterable)

> **filterAsync**\<`From`, `To`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`To`, `any`, `any`\>

Returns an async iterable that contains the values of `asyncIterable` in
iteration order excluding the values for which `fn` returns a value awaitable
to a falsy value.

Like `Array.prototype.filter`, but for async iterables.

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
    asAsync([`sloth party`, `building`, `sloths in trees`, `city`]),
    filterAsync(string => string.includes(`sloth`)),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

[filters.d.ts:64](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L64)

## filterAsync(fn)

> **filterAsync**\<`Value`\>(`fn`): (`asyncIterable`) => `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable that contains the values of `asyncIterable` in
iteration order excluding the values for which `fn` returns a value awaitable
to a falsy value.

Like `Array.prototype.filter`, but for async iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

### Returns

`Function`

#### Parameters

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

#### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth party`, `building`, `sloths in trees`, `city`]),
    filterAsync(string => string.includes(`sloth`)),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

[filters.d.ts:69](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L69)

## filterAsync(fn, asyncIterable)

> **filterAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable that contains the values of `asyncIterable` in
iteration order excluding the values for which `fn` returns a value awaitable
to a falsy value.

Like `Array.prototype.filter`, but for async iterables.

### Type Parameters

• **Value**

### Parameters

• **fn**

• **asyncIterable**: `AsyncIterable`\<`Value`, `any`, `any`\>

### Returns

`AsyncIterable`\<`Value`, `any`, `any`\>

### Example

```js
console.log(
  await pipe(
    asAsync([`sloth party`, `building`, `sloths in trees`, `city`]),
    filterAsync(string => string.includes(`sloth`)),
    reduceAsync(toArray()),
  ),
)
//=> [ 'sloth party', 'sloths in trees' ]
```

### Defined in

[filters.d.ts:72](https://github.com/TomerAberbach/lfi/blob/a3eb3a94b2928b5200a7bcd0a14fdc70f0cb5947/src/operations/filters.d.ts#L72)
