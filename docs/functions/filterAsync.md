[**lfi**](../readme.md) • **Docs**

---

[lfi](../globals.md) / filterAsync

# Function: filterAsync()

Returns an async iterable that contains the values of `asyncIterable` in
iteration order excluding the values for which `fn` returns a value awaitable to
a falsy value.

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

> **filterAsync**\<`From`, `To`\>(`fn`): (`asyncIterable`) =>
> `AsyncIterable`\<`To`, `any`, `any`\>

Returns an async iterable that contains the values of `asyncIterable` in
iteration order excluding the values for which `fn` returns a value awaitable to
a falsy value.

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

[exclude.d.ts:60](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/exclude.d.ts#L60)

## filterAsync(fn, asyncIterable)

> **filterAsync**\<`From`, `To`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`To`,
> `any`, `any`\>

Returns an async iterable that contains the values of `asyncIterable` in
iteration order excluding the values for which `fn` returns a value awaitable to
a falsy value.

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

[exclude.d.ts:63](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/exclude.d.ts#L63)

## filterAsync(fn)

> **filterAsync**\<`Value`\>(`fn`): (`asyncIterable`) =>
> `AsyncIterable`\<`Value`, `any`, `any`\>

Returns an async iterable that contains the values of `asyncIterable` in
iteration order excluding the values for which `fn` returns a value awaitable to
a falsy value.

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

[exclude.d.ts:68](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/exclude.d.ts#L68)

## filterAsync(fn, asyncIterable)

> **filterAsync**\<`Value`\>(`fn`, `asyncIterable`): `AsyncIterable`\<`Value`,
> `any`, `any`\>

Returns an async iterable that contains the values of `asyncIterable` in
iteration order excluding the values for which `fn` returns a value awaitable to
a falsy value.

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

[exclude.d.ts:71](https://github.com/TomerAberbach/lfi/blob/c9ef1bf4d1040d7f49c52b70b358c019e55f524d/src/operations/exclude.d.ts#L71)
